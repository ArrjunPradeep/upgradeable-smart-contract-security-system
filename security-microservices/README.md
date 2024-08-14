# Security Microservices

## Overview 
The `Security Microservices` are designed to enhance the `security` of blockchain systems by providing `real-time exploit detection`, `front-running defense`, and `detailed reporting`. These microservices are built using `NestJS` within a `monorepo`, ensuring a modular and scalable architecture.

## Features 
- **`Exploit Detection Microservice`** : Monitors and detects potential blockchain exploits, sending alerts for suspicious activities.
- **`Front-Run Defense Microservice`** : Triggers a transaction to pause the contract before a suspicious transaction occurs, implementing a dynamic gas pricing script.
- **`Slither Report Microservice`** : Analyzes smart contracts for vulnerabilities using Slither and generates detailed reports.

## Folder Descriptions

### `apps`

- **Purpose**: Contains the individual microservices that make up the application.
- **Subfolders**:
  - `exploit-detection`: Handles detection of exploits and sends notifications.
    - `src/exploit-detection.module.ts`: Defines the module for the exploit detection service.
    - `src/exploit-detection.service.ts`: Contains the business logic for exploit detection.
    - `src/exploit-detection.schema.ts`: Defines the Mongoose schema for exploit detection logs.
    - `src/main.ts`: Entry point for the exploit detection microservice.
    - `tsconfig.app.json`: TypeScript configuration for the exploit detection microservice.
  - `front-run-defense`: Implements defense mechanisms against attacks.
    - `src/front-run-defense.module.ts`: Defines the module for the front-run defense service.
    - `src/front-run-defense.schema.ts`: Defines the Mongoose schema for front-run defense logs.
    - `src/front-run-defense.service.ts`: Contains the business logic for front-run defense.
    - `src/main.ts`: Entry point for the front-run defense microservice.
    - `tsconfig.app.json`: TypeScript configuration for the front-run defense microservice.
  - `slither-report`: Generates and processes reports from Slither analysis.
    - `src/main.ts`: Entry point for the Slither report microservice.
    - `src/slither-report.controller.ts`: Defines the controller for handling HTTP requests.
    - `src/slither-report.module.ts`: Defines the module for the Slither report service.
    - `src/slither-report.schema.ts`: Defines the Mongoose schema for Slither report data.
    - `src/slither-report.service.ts`: Contains the business logic for handling Slither reports.
    - `test`: Contains tests for the Slither report microservice.
      - `app.e2e-spec.ts`: End-to-end tests for the Slither report service.
      - `jest-e2e.json`: Configuration for Jest end-to-end testing.
    - `tsconfig.app.json`: TypeScript configuration for the Slither report microservice.

### `libs`

- **Purpose**: Contains shared libraries and modules used across the microservices.
- **Subfolders**:
  - `common`: Provides common functionality and configurations used by multiple microservices.
    - `src/common.module.ts`: Defines the common module for shared functionality.
    - `src/config`: Contains configuration files for various aspects of the application.
      - `blockchain.config.ts`: Configuration for blockchain-related settings.
      - `database.config.ts`: Configuration for database connection and settings.
      - `email.config.ts`: Configuration for email notifications.
      - `exploit-detection.app.config.ts`: Configuration specific to the exploit detection microservice.
      - `front-run-defense.app.config.ts`: Configuration specific to the front-run defense microservice.
      - `index.ts`: Entry point for loading all configuration files.
    - `src/logging`: Contains logging utilities and configurations.
      - `winston.logger.ts`: Configuration for the Winston logging library.
    - `tsconfig.lib.json`: TypeScript configuration for the common library.

## Installation

## Prerequisites

Before deploying and running the microservices, ensure the following prerequisites are met :

### 1. **Node.js and npm**
   - **Node.js**: Ensure that Node.js is installed. Recommended version: 20.x or later.
   - **npm**: Ensure that npm (Node Package Manager) is installed, which is included with Node.js.

### 3. **NestJS CLI**
   - Ensure that the NestJS CLI is installed. You can install it globally using:
     ```bash
     npm install -g @nestjs/cli
     ```

### 9. **cURL Installation**
   - **cURL**: Ensure that cURL is installed if you plan to use it for testing API endpoints. You can check this by running `curl --version`.

### Setup

1. **Pull the Image from `Git Hub`**

   ```bash
    git clone git@github.com:ArrjunPradeep/upgradeable-smart-contract-security-system.git 
   ```

2. **Change the directory to security-microservices**

   ```bash
    cd security-microservices
   ```

3. **Install all the dependencies**

   ```bash
    npm i --save
   ```

4. **Ensure You Have the Required Environment Files**

   Create an `env` folder in the root of your project with the following files:

   * `app.env` : 
   ```bash
   EXPLOIT_DETECTION_HOST=XXXXXX
   EXPLOIT_DETECTION_PORT=XXXXXX
   EXPLOIT_DETECTION_API_SECRET_KEY=XXXXXX

   FRONT_RUN_DEFENSE_HOST=XXXXXX
   FRONT_RUN_DEFENSE_PORT=XXXXXX
   FRONT_RUN_DEFENSE_API_SECRET_KEY=XXXXXX

   PERFORMANCE_MONITORING_HOST=XXXXXX
   PERFORMANCE_MONITORING_PORT=XXXXXX
   PERFORMANCE_MONITORING_API_SECRET_KEY=XXXXXX
   ```

   * `blockchain.env` : 
   ```bash
   BLOCKCHAIN_WEBSOCKET_URL=XXXXXX
   BLOCKCHAIN_VULNERABLE_CONTRACT_ADDRESS=XXXXXX
   BLOCKCHAIN_PROXY_ADDRESS=XXXXXX
   BLOCKCHAIN_PRIVATE_KEY=XXXXXX
   BLOCKCHAIN_EXPLORER_API_KEY=XXXXXX
   ```

   * `database.env` : 
   ```bash
   MONGO_URL=XXXXXX
   ```

   * `email.env` : 
   ```bash
   EMAIL_HOST=XXXXXX
   EMAIL_PORT=XXXXXX
   EMAIL_USERNAME=XXXXXX
   EMAIL_PASSWORD=XXXXXX   
   ```

5. **Run exploit-detection microservice**
   ```bash
   npm run start:dev exploit-detection
   ```

6. **Run front-run-defense microservice**
   ```bash
   npm run start:dev front-run-defense
   ```

6. **Run slither-report microservice**
   ```bash
   npm run start:dev slither-report
   ```

## Microservice Descriptions

### 1. **Exploit Detection Microservice**

**Overview**:
The Exploit Detection Microservice is responsible for monitoring and detecting potential exploits in the blockchain system. It identifies suspicious activities, such as attempts to exploit known vulnerabilities in the smart contract, and triggers notifications to alert the system administrators.

**How It Works**:
- **Monitoring**: The microservice listens for incoming blockchain transactions and monitors for patterns or signatures that match known exploits, such as reentrancy or flash loan attacks.
- **Detection**: When a potential exploit is detected, the service logs the event and prepares a notification.
- **Notification**: The service sends an email notification to the system administrators, informing them of the suspicious activity. The notification includes details such as the transaction hash, the type of exploit detected, and the time of detection.

**Key Files**:
- `src/exploit-detection.service.ts`: Contains the logic for monitoring and detecting exploits.
- `src/exploit-detection.module.ts`: Defines the module for the exploit detection service.
- `src/exploit-detection.schema.ts`: Mongoose schema for storing exploit detection logs.

**Demo Overview**:

The Exploit Detection Microservice monitors blockchain transactions for potential exploits. In this demo, we will simulate a transaction that attempts to exploit a known vulnerability in the smart contract.

**Demo Steps**:
1. **Deploy the Vulnerable Contract**:
   - Ensure that the vulnerable contract is deployed on a test blockchain network.
   - Note the contract address and update the `BLOCKCHAIN_PROXY_ADDRESS` in the `blockchain.env` file.

2. **Simulate an Exploit**:
   - Use a tool like Remix or a custom script to send a transaction that triggers the known vulnerability (`reentrancy attack`).
   - A smart contract for sending a transaction that triggers the known vulnerability [Attack Smart Contract]('https://github.com/ArrjunPradeep/upgradeable-smart-contract-security-system/blob/main/vulnerable-upgradeable-contracts/src/Attack.sol')
   - Ensure the transaction is broadcasted to the blockchain network.
   - Ensure the exploit-detection microservice is running.

3. **Observe the Detection**:
   - The Exploit Detection Microservice will monitor the transaction and identify the exploit attempt.
   - Check your email for a notification alerting you to the suspicious transaction.
   - Review the logs in the microservice to see details of the detection event.

4. **Verify the Logs**:
   - Use a MongoDB client to access the database and review the logged detection events under the `exploitlogs` collection.


### 2. **Front-Run Defense Microservice**

**Overview**:
The Front-Run Defense Microservice aims to front-run the attacks by triggering a transaction to pause the vulnerable contract before a suspicious transaction is executed. This service is crucial for preemptively defending against potential attacks.

**How It Works**:
- **Transaction Monitoring**: The service constantly monitors the blockchain for incoming transactions that could be used to front-run a vulnerable contract.
- **Defense Mechanism**: When a suspicious transaction is detected, the service dynamically adjusts the gas price and triggers a transaction to pause the vulnerable contract, preventing the attack from succeeding.
- **Logging**: All defense actions are logged in the database for later analysis.

**Key Files**:
- `src/front-run-defense.service.ts`: Contains the logic for detecting front-running attempts and triggering the defense mechanism.
- `src/front-run-defense.module.ts`: Defines the module for the front-run defense service.
- `src/front-run-defense.schema.ts`: Mongoose schema for storing front-run defense logs.

**Demo Overview**:
The Front-Run Defense Microservice is designed to preemptively defend against suspicious transactions by pausing the contract. In this demo, you will simulate a suspicious transaction and observe how the microservice reacts.

**Demo Steps**:
1. **Monitor Transactions**:
   - Ensure the Front-Run Defense Microservice is running and connected to the blockchain network.

2. **Simulate a Front-Running Transaction**:
   - Use a custom script or a tool like Remix to simulate a suspicious transaction against the vulnerable contract.
   - The transaction should be crafted to exploit a timing vulnerability, such as manipulating the gas price to gain priority.

3. **Trigger the Defense**:
   - The microservice will detect the suspicious transaction and dynamically adjust the gas price to send a transaction that pauses the contract.
   - Check the blockchain explorer or logs to verify that the contract was successfully paused before the suspicious transaction was executed.

4. **Review the Defense Logs**:
   - Access the MongoDB database and review the `frontrundefenselogs` collection to see details of the defense event.
   - The logs will include the transaction hash, transaction data, time etc..

### 3. **Slither Report Microservice**

**Overview**:
The Slither Report Microservice generates and processes vulnerability reports for the smart contracts. It leverages the Slither static analysis tool to detect potential vulnerabilities in Solidity code and stores the results in a database for further analysis and reporting.

**How It Works**:
- **Static Analysis**: The microservice runs Slither on the specified Solidity code to analyze it for vulnerabilities such as reentrancy, unchecked external calls, and more.
- **Report Generation**: The results of the Slither analysis are compiled into a report, which includes details on all detected vulnerabilities.
- **Storage and Reporting**: The report is stored in a MongoDB database, where it can be accessed for later analysis. The service also provides an API to retrieve and review these reports.

**Key Files**:
- `src/slither-report.service.ts`: Contains the logic for running Slither analysis and handling reports.
- `src/slither-report.controller.ts`: Defines the API endpoints for triggering Slither analysis and retrieving reports.
- `src/slither-report.module.ts`: Defines the module for the Slither report service.
- `src/slither-report.schema.ts`: Mongoose schema for storing Slither report data.

**Demo Overview**:
The Slither Report Microservice analyzes smart contracts for vulnerabilities and generates detailed reports. This demo will guide you through running a Slither analysis on a smart contract and reviewing the generated report.

**Demo Steps**:
1. **Prepare the Solidity Files**:
   - Ensure you have a Solidity project ready for analysis. This should include the vulnerable contract you deployed earlier or any solidity files
   - Note the path to the Solidity files on your system.

2. **Run the Slither Analysis**:
   - Use the following cURL command to trigger the Slither analysis via the microservice:
     ```bash
     curl -X POST http://localhost:3363/slither/run \
     -H "Content-Type: application/json" \
     -d '{
       "filepath": "/path/to/your/solidity/files",
       "outputFilename": "slither_report.json"
     }'
     ```
   - Replace `/path/to/your/solidity/files` with the actual path to your Solidity files.

3. **Review the Report**:
   - Once the analysis is complete, the report will be saved in the specified `outputFilename` under foldername `slither-report`.
   - Use a JSON viewer or editor to open and review the report. It will include details of all detected vulnerabilities.

4. **Store and Retrieve Reports**:
   - The `filtered` report is also stored in the MongoDB database. You can generate it using the API provided by the Slither Report Microservice.
   - Access the database and review the `slitherresults` collection to see stored reports.


### 4. **Common Libraries**

**Overview**:
The `libs/common` directory contains shared utilities and configurations used by all microservices. This includes configurations for blockchain settings, database connections, email notifications, and logging utilities.

**Key Components**:
- **Configurations**: Separate configuration files for different aspects like blockchain, database, and email settings.
- **Logging**: Centralized logging configuration using `Winston` for consistent logging across all microservices.

**Key Files**:
- `src/config`: Contains various configuration files.
- `src/logging/winston.logger.ts`: Configuration for the Winston logging library.

### 4. **Overall System Demonstration**

**Objective**:
To demonstrate how the entire system works together, you can orchestrate a scenario where a vulnerability is exploited, detected, defended, and reported in sequence.

**Demo Scenario**:
1. **Start All Microservices**:
   - Ensure that all microservices (Exploit Detection, Front-Run Defense, and Slither Report) are running.

2. **Exploit the Contract**:
   - Deploy the vulnerable contract and simulate an exploit.
   - The Exploit Detection Microservice should detect the attack and send a notification.

3. **Defend the Contract**:
   - Simultaneously, simulate a front-running transaction.
   - The Front-Run Defense Microservice should pause the contract before the malicious transaction is executed.

4. **Analyze the Vulnerability**:
   - Run the Slither Report Microservice to analyze the contract and generate a report.
   - Review the report to understand the vulnerability in detail.

5. **Review the Logs and Reports**:
   - Access the database to review the detection, defense, and report logs.
   - Verify that each microservice operated as expected and logged the relevant events.

**Final Step**:
- **Manual Contract Upgrade**: After demonstrating the detection and defense mechanisms, manually upgrade the smart contract to fix the vulnerability. This step can be done using the script or a tool like Remix.