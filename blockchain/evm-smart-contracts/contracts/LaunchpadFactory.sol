// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

import "./Launchpad.sol";

contract LaunchpadFactory is Ownable, ReentrancyGuard {
    uint256 public costFee;

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

    function launch(string memory _launchpadTitle) external payable nonReentrant returns (Launchpad) {

        // check for payment
        require(msg.value == costFee, "Please pay cost fee");

        // send fee to owner
        (bool sent,) = owner().call{value: msg.value}('');
        require(sent, "Failed to send coin");
        emit Withdraw(owner(), msg.value);

        // create new launchpad
        Launchpad launchpad = new Launchpad(_launchpadTitle);
        launchpad.transferOwnership(_msgSender());

        // add launchpad address
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

    function setCostFee(uint256 _newCostFee) external onlyOwner returns (uint256) {
        costFee = _newCostFee;
        return _newCostFee;
    }
}

