import { registerAs } from '@nestjs/config';

// Register a configuration namespace for front-run defense settings
export const FRONT_RUN_DEFENSE_CONFIG = registerAs('FRONT_RUN_DEFENSE', () => {

    return {
        // Host address for the front-run defense service
        HOST: process.env['FRONT_RUN_DEFENSE_HOST'],

        // Port number for the front-run defense service, converted to an integer
        PORT: parseInt(process.env['FRONT_RUN_DEFENSE_PORT'], 10),

        // API secret key used for authenticating requests to the front-run defense service
        API_SECRET_KEY: process.env['FRONT_RUN_DEFENSE_API_SECRET_KEY'],
    }

});