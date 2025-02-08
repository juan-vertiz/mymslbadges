const winston = require('winston');
const { format } = winston;
const { combine, timestamp, label, printf } = format;

const logLevel = process.env.LOG_LEVEL || 'info';

const logFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

winston.loggers.add('app-service', {
    level: logLevel,
    format: combine(
        label({ label: 'app' }),
        timestamp(),
        logFormat,
    ),
    transports: [
        new winston.transports.Console({ level: logLevel }),
        new winston.transports.File({ filename: 'app-errors.log', level: 'error' }),
    ]
});

winston.loggers.add('http-service', {
    level: 'http',
    format: combine(
        label({ label: 'http' }),
        timestamp(),
        logFormat,
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'http.log' }),
    ]
});

module.exports = winston;
