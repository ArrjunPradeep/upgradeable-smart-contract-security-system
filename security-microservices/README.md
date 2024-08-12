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
## Storing Vulnerability Reports

To store the vulnerability reports generated by the Slither Report Microservice in the database, you need to execute a `curl` command that sends a `POST` request to the microservice. This command triggers the Slither analysis and saves the output to a specified file.

### cURL Command

Use the following `curl` command to post a request to the Slither Report Microservice:

```bash
curl -X POST http://localhost:3363/slither/run \
     -H "Content-Type: application/json" \
     -d '{
       "filepath": "$FULL_PATH_OF_SOLIDITY_FOLDER",
       "outputFilename": "$JSONFILE"
     }'
```

### Example 
If you want to analyze Solidity files located at /home/macbookpro/infinite/batchTransfer and save the results in analysis_results.json, your curl command would look like this:
```bash
curl -X POST http://localhost:3363/slither/run \
     -H "Content-Type: application/json" \
     -d '{
       "filepath": "/home/macbookpro/infinite/batchTransfer",
       "outputFilename": "analysis_results.json"
     }'
  ```
