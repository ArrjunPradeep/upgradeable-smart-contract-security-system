// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {VulnerableUpgradeableContract} from "../src/VulnerableUpgradeableContract.sol";
import {ERC1967Proxy} from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

contract DeployVulnerable is Script {
    function run() external returns (address) {
        address proxy = deployVulnerable();
        return proxy;
    }

    function deployVulnerable() public returns (address) {
        vm.startBroadcast();
        VulnerableUpgradeableContract vulnerableContract = new VulnerableUpgradeableContract();
        bytes memory data = abi.encodeWithSignature("initialize(address)", msg.sender);
        ERC1967Proxy proxy = new ERC1967Proxy(address(vulnerableContract), data);
        // VulnerableUpgradeableContract(address(proxy)).initialize(msg.sender);
        vm.stopBroadcast();
        return address(proxy);
    }
}
