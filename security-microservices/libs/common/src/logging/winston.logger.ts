import { ConfigService } from '@nestjs/config';
import { createLogger, format, transports } from 'winston';
import 'winston-mongodb';

// Custom log display format
const customFormat = format.printf(({ timestamp, level, context, message }) => {
    return `[Nest] ${process.pid}  - ${timestamp}  ${level.toUpperCase().padEnd(7)}  [${context}] ${message}`;
});

// Logger configuration
const winstonLogger = createLogger({
    format: format.combine(
        format.timestamp({ format: 'MM/DD/YYYY, h:mm:ss A' }),
        format.errors({ stack: true }),
        customFormat
    ),
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                customFormat
            ),
        }),
        new transports.MongoDB({
            db: process.env['MONGO_URL'],
            collection: 'logs',
            level: 'info',
            format: format.combine(
                format.timestamp(),
                format.json()
            )
        }),
        new transports.MongoDB({
            db: process.env['MONGO_URL'],
            collection: 'errors',
            level: 'error',
            format: format.combine(
                format.timestamp(),
                format.json()
            )
        })
    ],
});

export const instance = winstonLogger;
