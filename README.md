# Upgradeable Smart Contract Security System

## Overview

The `Upgradeable Smart Contract Security System` is a comprehensive solution designed to address and manage `vulnerabilities` in upgradeable smart contracts. This project leverages a `monorepo` approach using `NestJS` to develop `microservices`, ensuring a scalable and maintainable architecture. The system includes a vulnerable Solidity smart contract, a suite of microservices for exploit detection and prevention, and a robust reporting mechanism. The key components of the system are outlined below:

### Smart Contract Development
A Solidity smart contract has been developed with known vulnerabilities to reentrancy attack. This upgradeable contract incorporates the following functionalities using OpenZeppelin libraries:

- `Ownable`: Provides ownership management.
- `Pausable`: Allows pausing of the contract in emergencies.

### Front-Running Microservice
A microservice is implemented to `detect exploit attempts` and send `notifications` : 

- Monitors for exploit attempts on the smart contract.
- Sends email notifications when a potential exploit is detected.

### Detailed Reporting and Analytics
A reporting system is integrated to provide detailed analytics and performance metrics:

- Slither Integration: Utilizes `Slither` for vulnerability analysis and storing it to database
- Database Storage: Stores detailed reports and analytics in a MongoDB `database`, tracking system performance and the effectiveness of the pausing mechanism.

### Manual Upgrade Functionality
The system includes functionality for `manually upgrading` the smart contract to address vulnerabilities. An upgraded version of the contract has been created, which can be manually deployed to fix the vulnerabilities identified through notifications and reporting.

## Documentation 
[`Vulnerable Upgradeable Contracts README`](https://github.com/ArrjunPradeep/upgradeable-smart-contract-security-system/tree/main/vulnerable-upgradeable-contracts): Detailed documentation on the smart contract, including development, deployment, and upgrade scripts.

[`Security Microservices README`](https://github.com/ArrjunPradeep/upgradeable-smart-contract-security-system/tree/main/security-microservices): Comprehensive guide for the microservices, covering exploit detection, notification, front-running prevention, and reporting.