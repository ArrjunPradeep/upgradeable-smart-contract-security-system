import { registerAs } from '@nestjs/config';

export const FRONT_RUN_DEFENSE_CONFIG = registerAs('FRONT_RUN_DEFENSE', () => {

    return {
        HOST: process.env['FRONT_RUN_DEFENSE_HOST'],
        PORT: parseInt(process.env['FRONT_RUN_DEFENSE_PORT'], 10),
        API_SECRET_KEY: process.env['FRONT_RUN_DEFENSE_API_SECRET_KEY'],
    }

});