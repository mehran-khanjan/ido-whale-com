// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

import "./Launchpad.sol";

contract LaunchpadFactory is Ownable, ReentrancyGuard {
    uint256 public costFee;
    // bool public whitelistEnforced;
    mapping(address => bool) public whitelistedOperators;

    // owner => launchpads[]
    mapping(address => address[]) public launchpads;

    //launchpad => launch timestamp
    mapping(address => uint256) public launchIndex;

    // launchpad => owner
    mapping(address => address) public operator;

    event LaunchpadDeployed(address indexed launchpadAddress, address indexed creator);
    event Withdraw(address receiver, uint256 amount);

    constructor(uint256 _costFee) Ownable(_msgSender()) {
        costFee = _costFee;
    }

    function launch(string memory _launchpadTitle) external payable returns (Launchpad) {
        // if(whitelistEnforced){
        //     require(whitelistedOperators[_msgSender()], "FACTORY: OPERATOR NOT WHITELISTED");
        // }

        require(msg.value == costFee, "Please pay cost fee");

        Launchpad launchpad = new Launchpad(_launchpadTitle);
        launchpad.transferOwnership(_msgSender());

        address launchpadAddress = address(launchpad);
        launchpads[_msgSender()].push(launchpadAddress);
        operator[launchpadAddress] = _msgSender();
        launchIndex[launchpadAddress] = block.timestamp;

        emit LaunchpadDeployed(launchpadAddress, _msgSender());
        return launchpad;
    }

    function getLaunchpadCount(address _user) external view returns (uint256) {
        return launchpads[_user].length;
    }

    // function toggleListEnforcement(bool _state) external onlyOwner {
    //     whitelistEnforced = _state;
    // }

    // function modWhiteList(address[] calldata _whiteList, bool _state) external onlyOwner {
    //     for (uint256 i = 0; i < _whiteList.length; ++i) {
    //         whitelistedOperators[_whiteList[i]] = _state;
    //     }
    // }

    function setCostFee(uint256 _newCostFee) external onlyOwner returns (uint256) {
        costFee = _newCostFee;

        return _newCostFee;
    }

    function withdraw() external onlyOwner returns (uint256) {
        uint256 contractBalance = address(this).balance;

        if (contractBalance > 0) {
            (bool sent,) = msg.sender.call{value: contractBalance}('');
            require(sent, "Failed to send FTM");

            emit Withdraw(msg.sender, contractBalance);
            return contractBalance;
        } else {
            return 0;
        }
    }

    function balance() external view returns (uint256) {
        return address(this).balance;
    }
}

