// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {SecureUpgradeableContract} from "../src/SecureUpgradeableContract.sol";
import {VulnerableUpgradeableContract} from "../src/VulnerableUpgradeableContract.sol";
import {DevOpsTools} from "../lib/foundry-devops/src/DevOpsTools.sol";

contract UpgradeVulnerable is Script {
    function run() external returns (address) {
        address mostRecentlyDeployedProxy = DevOpsTools.get_most_recent_deployment("ERC1967Proxy", block.chainid);

        vm.startBroadcast();
        SecureUpgradeableContract newContract = new SecureUpgradeableContract();
        vm.stopBroadcast();
        address proxy = upgradeBox(mostRecentlyDeployedProxy, address(newContract));
        return proxy;
    }

    function upgradeBox(address proxyAddress, address newBox) public returns (address) {
        vm.startBroadcast();
        VulnerableUpgradeableContract proxy = VulnerableUpgradeableContract(payable(proxyAddress));
        proxy.upgradeToAndCall(address(newBox), new bytes(0));
        vm.stopBroadcast();
        return address(proxy);
    }
}
