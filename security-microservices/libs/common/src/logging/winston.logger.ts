import { createLogger, format, transports } from "winston";

const customFormat = format.printf(({ timestamp, level, context, message }) => {
    return `[Nest] ${process.pid}  - ${timestamp}  ${level.toUpperCase().padEnd(7)}  [${context}] ${message}`;
});

const winstonLogger = createLogger({
    format: format.combine(
        format.timestamp({ format: 'MM/DD/YYYY, h:mm:ss A' }),
        format.errors({ stack: true }),
    ),
    transports: [
        new transports.File({
            filename: 'combined.log',
            level: 'info',
            format: format.combine(
                customFormat,
                // format.json()
            ),
        }),
        new transports.File({
            filename: 'error.log',
            level: 'error',
            format: format.combine(
                customFormat
            ),
        }),
        new transports.Console({
            level: 'info',
            format: format.combine(
                customFormat
            ),
        }),
    ],
});

export const instance = winstonLogger;