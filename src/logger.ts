
import { createLogger, format, transports } from 'winston';
import { WinstonModule } from 'nest-winston';

import * as winstonDailyRotateFile from "winston-daily-rotate-file";

const { combine, timestamp, printf, colorize, simple } = format;

const consoleFormat = printf(({ level, message, namespace }) => {
    return `[${new Date().toISOString()}][${namespace ? namespace : 'server'}]`.padEnd(40) + `${level}: ${message}`;
});

export const mainLogger = WinstonModule.createLogger({
    level: 'info',
    defaultMeta: {
        service: 'dedication-server'
    },
    transports: [
        new transports.File({
            filename: './logs/error.log',
            level: 'error',
            format: combine(
                timestamp(),
                format.json(),
            )
        }),
        new winstonDailyRotateFile({
            filename: "./logs/json/%DATE%.log",
            datePattern: "YYYY-MM-DD",
            maxFiles: "30d",
            format: combine(
                timestamp(),
                format.json(),
            )
        }),
        new winstonDailyRotateFile({
            filename: "./logs/console/%DATE%.log",
            datePattern: "YYYY-MM-DD",
            maxFiles: "30d",
            format: consoleFormat
        }),
        new transports.Console({
            format: combine(
                colorize(),
                consoleFormat
            )
        })
    ],
    exceptionHandlers: [
        new transports.File({
            filename: './logs/uncaughtExceptions.log',
            format: combine(
                timestamp(),
                format.json(),
            )
        })
    ]
});
