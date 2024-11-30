// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.26;

//import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

interface IDEXRouter {
    function addLiquidityETH(
        address token,
        uint256 amountTokenDesired,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline
    ) external payable returns (uint256 amountToken, uint256 amountETH, uint256 liquidity);
}

contract Launchpad is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    // DEX Router
    IDEXRouter public dexRouter;
    uint256 public liquidityPercent; // e.g., 60% for liquidity
    uint256 public withdrawPercent;  // e.g., 40% for owner

    struct Pool {
        string poolURL;
        string poolTitle;
        string poolDescription;
        IERC20 token;
        uint256 tokenAmountToPreSale;
        uint256 softCap;
        uint256 hardCap;
        uint256 price;
        uint256 scaleFactor;
        uint256 maxContribution;
        uint256 minContribution;
        uint256 startTime;
        uint256 endTime;
        bool isWhiteList;
        bool enabled;
        bool finished;
    }

    uint32 private constant sweepBuffer = 86400;  //waiting period for sweep
    uint256 private constant minSpan = 86400;

    string public idoTitle;

    Pool[] public pools;
    mapping(uint256 => uint256) public poolsSold;
    mapping(uint256 => mapping(address => uint256)) public lockedTokens;
    mapping(uint256 => mapping(address => uint256)) public whiteList;

    event LiquidityAdded(uint256 id, uint256 tokenAmount, uint256 ethAmount, uint256 liquidity);
    event OwnerWithdraw(uint256 id, uint256 amount);
    event NewLaunchpad(address creator, address instance, uint256 blockCreated);
    event NewPool(address owner, address listing, uint256 id);
    event Swap(uint256 id, uint256 roundID, address sender, uint256 amount, uint256 amt);
    event Claim(uint256 id, address claimer, uint256 amount);
    event PoolFinished(uint256 id);
    event PoolStarted(uint256 id);
    event WhiteList(uint256 id);

    constructor(string memory _title) Ownable(_msgSender()) {
        idoTitle = _title;
        emit NewLaunchpad(_msgSender(), address(this), block.timestamp);
        // dexRouter = IDEXRouter(_routerAddress);
    }

    modifier onlyPreLaunch(uint256 _id) {
        if (_isPreSaleDisabled(_id)) {
            require(!pools[_id].enabled, "Pool is already enabled");
            require(!pools[_id].finished, "Pool is already completed");
        } else {
            require(block.timestamp < pools[_id].startTime, "Pool start time has passed");
        }
        _;
    }

    //validators
    function _isPreSaleDisabled(uint256 _id) internal view returns (bool){
        return (pools[_id].startTime == 0 && pools[_id].endTime == 0);
    }

    //setters
    function setStartTime(uint256 _id, uint256 _startTime) external onlyOwner onlyPreLaunch(_id) {
        if (_startTime > 0) {
            require(_startTime > block.timestamp, "Start time must be in future");
        }
        pools[_id].startTime = _startTime;
    }

    function setEndTime(uint256 _id, uint256 _endTime) external onlyOwner onlyPreLaunch(_id) {
        if (_endTime > 0) {
            require(_endTime > block.timestamp, "pool must end in the future, set start time");
            require(_endTime > pools[_id].startTime, "pool must be after start time");
        }
        require(pools[_id].startTime > 0, "Start time must be set first");

        pools[_id].endTime = _endTime;
    }

    function setTitle(string memory _title) external onlyOwner {
        idoTitle = _title;
    }

    function addWhiteList(uint256 id, address[] calldata _whiteList, uint256[] calldata _caps) external onlyOwner onlyPreLaunch(id) {
        require(_whiteList.length == _caps.length, "whitelist array length mismatch");
        for (uint256 i = 0; i < _whiteList.length; ++i) {
            whiteList[id][_whiteList[i]] = _caps[i];
        }
        emit WhiteList(id);
    }

    function poolsLength() external view returns (uint256) {
        return pools.length;
    }

    function createPool(
        string memory _poolURL,
        string memory _poolTitle,
        string memory _poolDescription,
        IERC20 _token,
        uint256 _tokenAmountToPreSale,
        uint256 _softCap,
        uint256 _hardCap,
        uint256 _price,
        uint256 _scaleFactor,
        uint256 _minContribution,
        uint256 _maxContribution,
        uint256 _startTime,
        uint256 _endTime,
        bool _isWhiteList,
        bool _enabled
    ) external onlyOwner nonReentrant returns (uint256) {

        // ToDo: remove URL and description after adding back-end
        // check for not empty strings
        require(bytes(_poolURL).length > 0, "Pool URL cannot be empty");
        require(bytes(_poolTitle).length > 0, "Pool title cannot be empty");
        require(bytes(_poolDescription).length > 0, "Pool description cannot be empty");

        // check for not zero address for token
        require(address(_token) != address(0), "Pool token cannot be zero address");

        // check for token
        require(_tokenAmountToPreSale <= _token.balanceOf(_msgSender()) && _tokenAmountToPreSale > 0, "Your token balance is not enough");
        require(_token.allowance(_msgSender(), address(this)) >= _tokenAmountToPreSale, "Get token approval first");
        for (uint256 i = 0; i < pools.length; i++) {
            require(
                address(pools[i].token) != address(_token) || pools[i].endTime < block.timestamp, "A pool for this token is already active"
            );
        }

        // check soft cap and hard cap
        require(_softCap > uint256(0), "Soft cap must be greater than 0");
        require(_hardCap > uint256(0), "Hard cap must be greater than 0");
        require(_softCap <= _hardCap, "Soft cap must be less than or equal to hard cap");
        uint256 maxTokensNeeded = (_hardCap * _scaleFactor) / _price;
        require(_tokenAmountToPreSale >= maxTokensNeeded, "Insufficient tokens for hard cap");

        // check for price and scaling factor
        require(_price > uint256(0), "Price must be greater than 0");
        require(_scaleFactor > uint256(0), "Scale factor must be greater than 0");
        require(_scaleFactor >= 1 && _scaleFactor <= 10 ** 18, "Scale factor must be reasonable for token decimals");

        // check for min and max contribution
        require(_minContribution > uint256(0), "Min contribution must be greater than 0");
        require(_maxContribution > uint256(0), "Max contribution must be greater than 0");
        require(_minContribution < _maxContribution, "Min contribution must be less than max contribution");

        // check for start and end time
        require(_startTime > block.timestamp, "Start time must be in future");
        require(_endTime > block.timestamp && _endTime > _startTime, "End time must be in future and greater than start time");
        require(_endTime - _startTime >= minSpan, "Pool duration must be at least the minimum span");
        require(_startTime < block.timestamp + 365 days, "Start time must be within a year from now");

        // if whiteList enabled, the owner must add whitelist users first, then enable the pre-sale
        if (_isWhiteList) {
            require(!_enabled, "You need to add whitelist address to enable");
        }

        Pool memory newPool = Pool(
            _poolURL,
            _poolTitle,
            _poolDescription,
            _token,
            _tokenAmountToPreSale,
            _softCap,
            _hardCap,
            _price,
            _scaleFactor,
            _maxContribution,
            _minContribution,
            _startTime,
            _endTime,
            _isWhiteList,
            _enabled,
            false
        );
        pools.push(newPool);
        _token.transferFrom(_msgSender(), address(this), _tokenAmountToPreSale);
        emit NewPool(_msgSender(), address(this), pools.length);
        return pools.length;
    }

    function swap(uint256 id, uint256 amount) external payable nonReentrant {
        require(amount != 0, "Amount should not be zero");

        if (_isPreSaleDisabled(id)) {
            require(pools[id].enabled, "Pool must be enabled");
        } else {
            require(pools[id].startTime < block.timestamp && block.timestamp < pools[id].endTime, "TIME: Pool not open");
        }

        if (pools[id].isWhiteList) {
            require(whiteList[id][_msgSender()] > 0, "Should be white listed for the pool");
        }

        require(amount == msg.value, "Amount is not equal msg.value");

        // Ensure min/max contribution is respected
        require(amount >= pools[id].minContribution, "Contribution is less than minimum");
        require(
            lockedTokens[id][_msgSender()] + amount <= pools[id].maxContribution,
            "Exceeds max contribution"
        );

        // Ensure whitelist check if enabled
        if (pools[id].isWhiteList) {
            require(whiteList[id][_msgSender()] > 0, "Not whitelisted");
            require(
                lockedTokens[id][_msgSender()] + amount <= whiteList[id][_msgSender()],
                "Exceeds whitelist contribution limit"
            );
        }

        // Ensure no over-contribution beyond hard cap
        uint256 remainingTokens = pools[id].hardCap - poolsSold[id];
        require(remainingTokens >= amount, "Contribution exceeds available tokens");

        Pool memory pool = pools[id];
        uint256 left = pool.tokenAmountToPreSale - poolsSold[id];

        //console.log("left1", left);
        uint256 curLocked = lockedTokens[id][_msgSender()];
        if (left > pool.maxContribution - curLocked) {
            left = pool.maxContribution - curLocked;
        }
        //console.log("left2", left);
        if (pools[id].isWhiteList && left >= whiteList[id][_msgSender()] - curLocked) {
            left = whiteList[id][_msgSender()] - curLocked;
        }
        //console.log("left3", left);
        //console.log("curLocked", curLocked, "allo", whiteList[id][_msgSender()]);

        uint256 amt = (pool.price * amount) / pools[id].scaleFactor;

        //console.log("amt", amt);
        require(left > 0, "Not enough tokens for swap");
        uint256 back = 0;
        if (left < amt) {
            //console.log("left", left);
            //console.log("amt_", amt);
            amt = left;
            uint256 newAmount = (amt * pools[id].scaleFactor) / pool.price;
            back = amount - newAmount;
            amount = newAmount;
        }
        lockedTokens[id][_msgSender()] = curLocked + amt;
        poolsSold[id] = poolsSold[id] + amt;

        // (bool success,) = owner().call{value: amount}("");
        // require(success, "Should transfer ethers to the pool creator");
        if (back > 0) {
            (bool success,) = _msgSender().call{value: back}("");
            require(success, "Should transfer left ethers back to the user");
        }

        emit Swap(id, 0, _msgSender(), amount, amt);
    }

    function startPool(uint256 id) external onlyOwner {
        //require(_isManual(id), "Pool is timed and not manual start");
        require(!pools[id].enabled, "Pool is already enabled");
        require(!pools[id].finished, "Pool is already completed");
        pools[id].enabled = true;
        emit PoolStarted(id);
    }

    function stopPool(uint256 id) external onlyOwner {
        //require(_isManual(id), "Pool is timed and not manual stop");
        require(pools[id].enabled, "Pool is not enabled");
        require(!pools[id].finished, "Pool is already completed");
        pools[id].enabled = false;
        pools[id].finished = true;
        emit PoolFinished(id);
    }

    function finalizePool(uint256 id) external onlyOwner {
        // Ensure the pool is enabled and not already finalized
        require(pools[id].enabled, "Pool is not enabled or already finalized");
        require(!pools[id].finished, "Pool is already completed");

        // Check if the pool duration has passed
        require(block.timestamp > pools[id].endTime, "Presale is still active");

        pools[id].finished = true;

        // Check if the soft cap was reached
        uint256 totalRaised = address(this).balance;
        if (totalRaised < pools[id].softCap) {
            // Soft cap not met: initiate refunds
            pools[id].enabled = false;
            for (uint256 i = 0; i < pools.length; i++) {
                uint256 contribution = lockedTokens[id][_msgSender()];
                if (contribution > 0) {
                    lockedTokens[id][_msgSender()] = 0;
                    (bool refunded,) = _msgSender().call{value: contribution}("");
                    require(refunded, "Refund failed");
                }
            }
        } else {
            // Soft cap met: transfer raised funds to the owner
            (bool success,) = owner().call{value: totalRaised}("");
            require(success, "Fund transfer to owner failed");
        }

        // Return unsold tokens to the owner
        uint256 unsoldTokens = pools[id].tokenAmountToPreSale - poolsSold[id];
        if (unsoldTokens > 0) {
            pools[id].token.transfer(owner(), unsoldTokens);
        }

        emit PoolFinished(id);
    }

    function claim(uint256 id) external nonReentrant {
        if (_isPreSaleDisabled(id)) {
            require(pools[id].finished, "Cannot claim until pool is finished");
        } else {
            require(block.timestamp > pools[id].endTime);
        }

        require(lockedTokens[id][_msgSender()] > 0, "Should have tokens to claim");

        // Ensure that the caller is not attempting multiple claims
        require(lockedTokens[id][_msgSender()] > 0, "Already claimed tokens");

        // Check for paused or blocked claims (if paused feature added)
        // require(!pools[id].paused, "Claiming is currently paused");

        uint256 amount = lockedTokens[id][_msgSender()];
        lockedTokens[id][_msgSender()] = 0;
        pools[id].token.transfer(_msgSender(), amount);
        emit Claim(id, _msgSender(), amount);
    }

    function ownerWithdraw(uint256 id) external onlyOwner nonReentrant {
        Pool storage pool = pools[id];

        // Ensure pool is finished and the soft cap is reached
        require(pool.finished, "Pool is not finished");
        require(
            address(this).balance >= pool.softCap,
            "Soft cap not reached, cannot withdraw"
        );

        uint256 balanceToWithdraw = address(this).balance;

        require(balanceToWithdraw > 0, "No funds to withdraw");

        (bool success,) = owner().call{value: balanceToWithdraw}("");
        require(success, "Withdraw failed");

        emit PoolFinished(id); // Optional, or create a new withdrawal event
    }

    function userRefund(uint256 id) external nonReentrant {
        Pool storage pool = pools[id];

        // Ensure the pool is finished and soft cap is not reached
        require(pool.finished, "Pool is not finished");
        require(
            address(this).balance < pool.softCap,
            "Soft cap reached, no refund available"
        );

        uint256 userContribution = lockedTokens[id][_msgSender()];
        require(userContribution > 0, "No contributions to refund");

        // Reset the user's contribution balance before transferring to prevent reentrancy
        lockedTokens[id][_msgSender()] = 0;

        // Refund user's contribution
        (bool success,) = _msgSender().call{value: userContribution}("");
        require(success, "Refund failed");

        emit Claim(id, _msgSender(), userContribution); // Reuse event for refund
    }

    function finalizePoolAndAddLiquidity(uint256 id) external onlyOwner nonReentrant {
        Pool storage pool = pools[id];

        require(pool.finished == false, "Pool already finalized");
        require(address(this).balance >= pool.softCap, "Soft cap not reached");

        uint256 totalBalance = address(this).balance;

        // Calculate amounts
        uint256 liquidityETH = (totalBalance * liquidityPercent) / 100;
        uint256 withdrawETH = (totalBalance * withdrawPercent) / 100;

        // Approve tokens for DEX
        uint256 tokenAmount = pool.tokenAmountToPreSale;
        pool.token.approve(address(dexRouter), tokenAmount);

        // Add liquidity to DEX
        (uint256 amountToken, uint256 amountETH, uint256 liquidity) = dexRouter.addLiquidityETH{value: liquidityETH}(
            address(pool.token),
            tokenAmount,
            0,
            0,
            owner(),
            block.timestamp + 300 // 5 minutes deadline
        );

        // ToDo: Lock or burn liquidity tokens

        emit LiquidityAdded(id, amountToken, amountETH, liquidity);

        // ToDo: Lock amount of coins for a certain period of time

        // Withdraw remaining funds to owner
        (bool success,) = owner().call{value: withdrawETH}("");
        require(success, "Withdraw failed");

        pool.finished = true;
        emit OwnerWithdraw(id, withdrawETH);
    }

}