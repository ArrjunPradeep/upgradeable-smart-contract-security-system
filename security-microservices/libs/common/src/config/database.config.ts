import { registerAs } from "@nestjs/config";

export const DATABASE_CONFIG = registerAs("DATABASE", () => {
    return {
        TYPE: process.env['POSTGRES_TYPE'],
        HOST: process.env['POSTGRES_HOST'],
        PORT: process.env['POSTGRES_PORT'],
        NAME: process.env['POSTGRES_DB'],
        USERNAME: process.env['POSTGRES_USER'],
        PASSWORD: process.env['POSTGRES_PASSWORD'],
        SYNCHRONIZE: process.env['POSTGRES_SYNCHRONIZE'],
        AUTO_LOAD_ENTITIES: process.env['POSTGRES_AUTO_LOAD_ENTITIES']
    }
})