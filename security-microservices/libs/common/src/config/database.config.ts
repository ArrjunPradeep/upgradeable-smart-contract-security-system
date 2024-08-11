import { registerAs } from "@nestjs/config";

export const DATABASE_CONFIG = registerAs("DATABASE", () => {
    return {
        MONGO_URL: process.env['MONGO_URL'],
    }
})