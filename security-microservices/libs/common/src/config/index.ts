import { BLOCKCHAIN_CONFIG } from "./blockchain.config";
import { DATABASE_CONFIG } from "./database.config";
import { EMAIL_CONFIG } from "./email.config";
import {EXPLOIT_DETECTION_CONFIG} from "./exploit-detection.app.config"
import {FRONT_RUN_DEFENSE_CONFIG} from "./front-run-defense.app.config"
import { SLITHER_REPORT_CONFIG } from "./slither-report.config";

export default [
    EXPLOIT_DETECTION_CONFIG, 
    FRONT_RUN_DEFENSE_CONFIG, 
    SLITHER_REPORT_CONFIG,
    EMAIL_CONFIG,
    BLOCKCHAIN_CONFIG,
    DATABASE_CONFIG
];