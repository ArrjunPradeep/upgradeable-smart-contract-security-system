import { BLOCKCHAIN_CONFIG } from "./blockchain.config";
import { DATABASE_CONFIG } from "./database.config";
import { EMAIL_CONFIG } from "./email.config";
import { EXPLOIT_DETECTION_CONFIG } from "./exploit-detection.app.config";
import { FRONT_RUN_DEFENSE_CONFIG } from "./front-run-defense.app.config"; 
import { SLITHER_REPORT_CONFIG } from "./slither-report.config";

// Export an array of configuration providers
export default [
    // Configuration for exploit detection service
    EXPLOIT_DETECTION_CONFIG, 

    // Configuration for front-run defense service
    FRONT_RUN_DEFENSE_CONFIG, 

    // Configuration for Slither report generation
    SLITHER_REPORT_CONFIG,

    // Configuration for email service
    EMAIL_CONFIG,

    // Configuration for blockchain settings
    BLOCKCHAIN_CONFIG,

    // Configuration for database connection
    DATABASE_CONFIG
];