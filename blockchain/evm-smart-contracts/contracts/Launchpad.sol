// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.7;

//import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Launchpad is Ownable {
    using SafeERC20 for IERC20;

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

    event NewLaunchpad(address creator, address instance, uint256 blockCreated, uint version);
    event NewPool(address owner, address listing, uint256 id);
    event Swap(uint256 id, uint256 roundID, address sender, uint256 amount, uint256 amt);
    event Claim(uint256 id, address claimer, uint256 amount);
    event PoolFinished(uint256 id);
    event PoolStarted(uint256 id);
    event WhiteList(uint256 id);

    constructor(string memory _title) Ownable(_msgSender()) {
        idoTitle = _title;
        emit NewLaunchpad(_msgSender(), address(this), block.timestamp, uint(0));
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
        uint256 _maxContribution,
        uint256 _minContribution,
        uint256 _startTime,
        uint256 _endTime,
        bool _isWhiteList,
        bool _enabled,
        bool _finished

    ) external onlyOwner returns (uint256) {
        require(address(_token) != address(0), "Pool token cannot be zero address");

        require(_tokenAmountToPreSale <= _token.balanceOf(_msgSender()) && _tokenAmountToPreSale > 0, "Cap check");

        require(_price > uint256(0), "Price must be greater than 0");
        require(_scaleFactor > uint256(0), "Scale factor must be greater than 0");

        require(_startTime > block.timestamp, "Start time must be in future");
        require(_endTime > block.timestamp && _endTime > _startTime, "Start time must be in future and greater than start time");

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
            _finished
        );
        pools.push(newPool);
        _token.transferFrom(_msgSender(), address(this), _tokenAmountToPreSale);
        emit NewPool(_msgSender(), address(this), pools.length);
        return pools.length;
    }

    function swap(uint256 id, uint256 amount) external payable {
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

        (bool success,) = owner().call{value: amount}("");
        require(success, "Should transfer ethers to the pool creator");
        if (back > 0) {
            (success,) = _msgSender().call{value: back}("");
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
        //require some time limit
        //sweep remaining tokens
    }

    function claim(uint256 id) external {
        if (_isPreSaleDisabled(id)) {
            require(pools[id].finished, "Cannot claim until pool is finished");
        } else {
            require(block.timestamp > pools[id].endTime);
        }

        require(lockedTokens[id][_msgSender()] > 0, "Should have tokens to claim");
        uint256 amount = lockedTokens[id][_msgSender()];
        lockedTokens[id][_msgSender()] = 0;
        pools[id].token.transfer(_msgSender(), amount);
        emit Claim(id, _msgSender(), amount);
    }


}