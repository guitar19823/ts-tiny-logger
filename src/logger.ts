import { LogEntry, ILogger } from './types';

/**
 * A simple logger class that implements the Flyweight pattern
 * to allow for multiple logger instances
 */
export class Logger implements ILogger {
  private logs: LogEntry[] = [];
  private static instances: Map<string, Logger> = new Map();

  /**
   * Private constructor to prevent direct instantiation
   */
  private constructor() {}

  /**
   * Get a logger instance with the given identifier
   * If an instance with this identifier already exists, it will be returned
   * Otherwise, a new instance will be created
   * 
   * @param identifier - Unique identifier for the logger instance
   * @returns Logger instance
   */
  public static getInstance(identifier: string): Logger {
    if (!Logger.instances.has(identifier)) {
      Logger.instances.set(identifier, new Logger());
    }
    
    return Logger.instances.get(identifier)!;
  }

  /**
   * Add a new log entry
   * 
   * @param name - Name or category of the log
   * @param value - Value or message to be logged
   */
  public log(name: string, value: string): void {
    const now = new Date();
    const dateTime = this.formatDateTime(now);
    
    this.logs.push({
      dateTime,
      name,
      value
    });
  }

  /**
   * Get all log entries
   * 
   * @returns Array of log entries
   */
  public getLogs(): LogEntry[] {
    return [...this.logs];
  }

  /**
   * Clear all log entries
   */
  public clearLogs(): void {
    this.logs = [];
  }

  /**
   * Format date and time to 'YYYY-MM-DD:hh-mm-ss-ms' format
   * 
   * @param date - Date object to format
   * @returns Formatted date and time string
   */
  private formatDateTime(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
    
    return `${year}-${month}-${day}:${hours}-${minutes}-${seconds}-${milliseconds}`;
  }
} 