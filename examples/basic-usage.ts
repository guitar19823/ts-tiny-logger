import { Logger } from '../src';

console.log('Tiny TS Logger Example:');

// Create an application logger
const appLogger = Logger.getInstance('app');
appLogger.log('init', 'Application started');
appLogger.log('config', 'Configuration loaded');

console.log('App Logger logs:');
console.log(appLogger.getLogs());

// Create a database logger
const dbLogger = Logger.getInstance('database');
dbLogger.log('connect', 'Database connected');
dbLogger.log('query', 'SELECT * FROM users');

console.log('\nDatabase Logger logs:');
console.log(dbLogger.getLogs());

// Get the same app logger instance
const sameAppLogger = Logger.getInstance('app');
console.log('\nSame instance test:');
console.log('Are loggers the same instance?', appLogger === sameAppLogger);

// Add more logs to the app logger
sameAppLogger.log('finish', 'Task completed');

console.log('\nApp Logger logs after adding more entries:');
console.log(appLogger.getLogs());

// Clear logs
console.log('\nClearing app logs...');
appLogger.clearLogs();
console.log('App Logger logs after clearing:');
console.log(appLogger.getLogs()); 