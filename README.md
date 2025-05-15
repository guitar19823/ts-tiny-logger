# TS Tiny Logger

A lightweight TypeScript logger package that can create multiple logger instances using the Flyweight pattern.

## Installation

```bash
npm install ts-tiny-logger
```

## Features

- Create multiple logger instances
- Log entries with name and value
- Get all log entries
- Clear log entries
- Timestamp format: 'YYYY-MM-DD:hh-mm-ms'

## Usage

```typescript
import { Logger } from 'ts-tiny-logger';

// Create a logger instance
const logger1 = Logger.getInstance('app');

// Add log entries
logger1.log('init', 'Application started');
logger1.log('user', 'User logged in');

// Get all logs
const logs = logger1.getLogs();
console.log(logs);
// [
//   { dateTime: '2023-10-10:12-30-456', name: 'init', value: 'Application started' },
//   { dateTime: '2023-10-10:12-31-789', name: 'user', value: 'User logged in' }
// ]

// Create another logger instance with a different name
const logger2 = Logger.getInstance('database');
logger2.log('connection', 'Database connected');

// The same instance is returned if the same name is used
const appLoggerAgain = Logger.getInstance('app');
console.log(appLoggerAgain === logger1); // true

// Clear logs
logger1.clearLogs();
console.log(logger1.getLogs()); // []
```

## Testing

The package includes a comprehensive test suite with 100% code coverage.

To run tests:

```bash
npm test
```

To run tests with coverage report:

```bash
npm run test:coverage
```

## License

ISC 