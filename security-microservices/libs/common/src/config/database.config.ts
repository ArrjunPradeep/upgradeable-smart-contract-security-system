import { registerAs } from "@nestjs/config";

// Register a configuration namespace for database-related settings
export const DATABASE_CONFIG = registerAs("DATABASE", () => {
    return {
        // URL for connecting to the MongoDB database
        MONGO_URL: process.env['MONGO_URL'],
    }
});