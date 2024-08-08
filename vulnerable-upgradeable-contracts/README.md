## Vulnerablr Upgradeable Smart Contract [[vulnerableUpgradeable](https://sepolia.etherscan.io/address/0x155f418399E8423bA4005B26bBC9567A5Bbd4d44)] [[proxy](https://sepolia.etherscan.io/address/0x1C1c80e58CC9EE00443E6a8C1C2Ce743ea4A43a6)]

## Overview

**The Upgradeable Smart Contract Suite, developed using the Foundry framework, includes a `vulnerable` and a `secure` version of an upgradeable smart contract. This suite demonstrates both the initial vulnerable state and the enhanced secure version that addresses known vulnerabilities. The project also incorporates OpenZeppelin libraries for `Ownable` and `Pausable` functionalities, providing additional security and control.**

## Vulnerable Upgradeable Smart Contract

   `VulnerableUpgradeableContract`: This contract is intentionally designed to be vulnerable to reentrancy attacks. Key features include:

- Deposit Function: Allows users to deposit funds.
- Withdraw Function: Enables fund withdrawals but is vulnerable to reentrancy attacks.
- Ownable: Provides ownership control for administrative actions.
- Pausable: Allows the contract to be paused or resumed by the owner.

## Vulnerable Upgradeable Smart Contract
    
   `SecureUpgradeableContract`: This contract improves upon the `VulnerableUpgradeableContract` by : 
- ReentrancyGuard: Implementing a reentrancy guard to prevent reentrancy attacks and enhance security.

## Prerequisites
- Docker

## Setup 

1. **Pull the Image**

    ```shell
    docker pull arrjunpradeep/upgradeablecontract:latest
    ``` 

2. **Configure `.env` file within the directory**

- TEST_PRIVATE_KEY=XXXXXX
- PRIVATE_KEY=XXXXXX
- RPC_URL=XXXXXX
- SEPOLIA_RPC_URL=XXXXXX
- ETHERSCAN_API_KEY=XXXXXX
- SENDER_ADDRESS=XXXXXX

    **Source the `.env` file**

    ```shell
    source .env
    ``` 

3. **Deploy and Verify the Vulnerable Upgradeable Smart Contract**

    Run the container for deploying and verifying the `vulnerable upgradeable` smart contract:

    ```shell
    docker run arrjunpradeep/upgradeablecontract script DeployVulnerable.s.sol --rpc-url $SEPOLIA_RPC_URL --broadcast --etherscan-api-key $ETHERSCAN_API_KEY --contracts src/VulnerableUpgradeableContract.sol:VulnerableUpgradeableContract --verify --sender $SENDER_ADDRESS --private-key $PRIVATE_KEY
    ``` 
4. **Deploy and Verify the `secure upgradeable` Smart Contract**

    Run the container for deploying and verifying the `vulnerable upgradeable` smart contract:

    ```shell
    docker run arrjunpradeep/upgradeablecontract script UpgradeVulnerable.s.sol --rpc-url $SEPOLIA_RPC_URL --broadcast --etherscan-api-key $ETHERSCAN_API_KEY --contracts src/SecureUpgradeableContract.sol:SecureUpgradeableContract --verify --sender $SENDER_ADDRESS --private-key $PRIVATE_KEY
    ``` 

    **Notes :**

    ****The PRIVATE_KEY is included in the .env file for development purposes only. For production environments, it is recommended to use secure methods to manage sensitive information.****






