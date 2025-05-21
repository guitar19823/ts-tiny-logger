/**
 * Interface for a log entry
 */
export interface LogEntry {
  /** Timestamp in format 'YYYY-MM-DD:hh-mm-ss-ms' */
  dateTime: string;
  /** Name or category of the log entry */
  name: string;
  /** Value or message to be logged */
  value: string;
}

/**
 * Interface for logger instance
 */
export interface ILogger {
  /** Add a new log entry */
  log(name: string, value: string): void;
  
  /** Get all log entries */
  getLogs(): LogEntry[];
  
  /** Clear all log entries */
  clearLogs(): void;
} 