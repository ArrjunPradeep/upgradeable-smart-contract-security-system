import { ConfigService } from '@nestjs/config';
import { createLogger, format, transports } from 'winston';
import 'winston-mongodb';

// Custom log display format
const customFormat = format.printf(({ timestamp, level, context, message }) => {
    return `[Nest] ${process.pid}  - ${timestamp}  ${level.toUpperCase().padEnd(7)}  [${context}] ${message}`;
});

// Logger configuration
const winstonLogger = createLogger({
    // Define the logging format
    format: format.combine(
        // Timestamp in a custom format
        format.timestamp({ format: 'MM/DD/YYYY, h:mm:ss A' }),
        // Include stack trace for errors
        format.errors({ stack: true }),
        // Use custom format for log messages
        customFormat
    ),
    // Define the logging transports
    transports: [
        // Console transport for logging to the console
        new transports.Console({
            format: format.combine(
                // Colorize the output for better readability
                format.colorize(),
                // Use custom format for console logs
                customFormat
            ),
        }),
        // MongoDB transport for logging info level messages to MongoDB
        new transports.MongoDB({
            db: process.env['MONGO_URL'], // MongoDB connection URL from environment variables
            collection: 'logs', // MongoDB collection for info level logs
            level: 'info', // Log level for this transport
            format: format.combine(
                // Timestamp for each log entry
                format.timestamp(),
                // Format logs as JSON
                format.json()
            )
        }),
        // MongoDB transport for logging error level messages to MongoDB
        new transports.MongoDB({
            db: process.env['MONGO_URL'], // MongoDB connection URL from environment variables
            collection: 'errors', // MongoDB collection for error level logs
            level: 'error', // Log level for this transport
            format: format.combine(
                // Timestamp for each log entry
                format.timestamp(),
                // Format logs as JSON
                format.json()
            )
        })
    ],
});

// Export the logger instance for use in other parts of the application
export const instance = winstonLogger;