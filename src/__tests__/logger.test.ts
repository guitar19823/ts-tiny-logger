import { Logger } from '../logger';

describe('Logger', () => {
  beforeEach(() => {
    // Clear all instances between tests
    // @ts-ignore - Private static field access for testing
    Logger.instances = new Map();
  });

  describe('getInstance', () => {
    it('should create a new logger instance', () => {
      const logger = Logger.getInstance('test');
      expect(logger).toBeInstanceOf(Logger);
    });

    it('should return the same instance for the same identifier', () => {
      const logger1 = Logger.getInstance('test');
      const logger2 = Logger.getInstance('test');
      expect(logger1).toBe(logger2);
    });

    it('should create different instances for different identifiers', () => {
      const logger1 = Logger.getInstance('test1');
      const logger2 = Logger.getInstance('test2');
      expect(logger1).not.toBe(logger2);
    });

    it('should create multiple instances with unique logs', () => {
      const logger1 = Logger.getInstance('test1');
      const logger2 = Logger.getInstance('test2');
      const logger3 = Logger.getInstance('test3');
      
      logger1.log('name1', 'value1');
      logger2.log('name2', 'value2');
      logger3.log('name3', 'value3');
      
      expect(logger1.getLogs()).toHaveLength(1);
      expect(logger1.getLogs()[0].name).toBe('name1');
      
      expect(logger2.getLogs()).toHaveLength(1);
      expect(logger2.getLogs()[0].name).toBe('name2');
      
      expect(logger3.getLogs()).toHaveLength(1);
      expect(logger3.getLogs()[0].name).toBe('name3');
    });
  });

  describe('log', () => {
    it('should add a log entry', () => {
      const logger = Logger.getInstance('test');
      logger.log('test-name', 'test-value');
      const logs = logger.getLogs();
      
      expect(logs).toHaveLength(1);
      expect(logs[0].name).toBe('test-name');
      expect(logs[0].value).toBe('test-value');
      expect(logs[0].dateTime).toMatch(/^\d{4}-\d{2}-\d{2}:\d{2}-\d{2}-\d{2}-\d{3}$/);
    });

    it('should add multiple log entries', () => {
      const logger = Logger.getInstance('test');
      logger.log('name1', 'value1');
      logger.log('name2', 'value2');
      
      const logs = logger.getLogs();
      expect(logs).toHaveLength(2);
      expect(logs[0].name).toBe('name1');
      expect(logs[0].value).toBe('value1');
      expect(logs[1].name).toBe('name2');
      expect(logs[1].value).toBe('value2');
    });

    it('should handle empty string values', () => {
      const logger = Logger.getInstance('test');
      logger.log('', '');
      
      const logs = logger.getLogs();
      expect(logs).toHaveLength(1);
      expect(logs[0].name).toBe('');
      expect(logs[0].value).toBe('');
    });

    it('should preserve order of log entries', () => {
      const logger = Logger.getInstance('test');
      for (let i = 0; i < 10; i++) {
        logger.log(`name${i}`, `value${i}`);
      }
      
      const logs = logger.getLogs();
      expect(logs).toHaveLength(10);
      
      for (let i = 0; i < 10; i++) {
        expect(logs[i].name).toBe(`name${i}`);
        expect(logs[i].value).toBe(`value${i}`);
      }
    });
  });

  describe('getLogs', () => {
    it('should return a copy of logs array', () => {
      const logger = Logger.getInstance('test');
      logger.log('test', 'value');
      
      const logs1 = logger.getLogs();
      const logs2 = logger.getLogs();
      
      expect(logs1).toEqual(logs2);
      expect(logs1).not.toBe(logs2); // Different array reference
    });

    it('should return empty array when no logs', () => {
      const logger = Logger.getInstance('test');
      const logs = logger.getLogs();
      
      expect(logs).toEqual([]);
    });

    it('should not allow modifying original logs via returned array', () => {
      const logger = Logger.getInstance('test');
      logger.log('test', 'value');
      
      const logs = logger.getLogs();
      logs.push({ dateTime: 'fake', name: 'fake', value: 'fake' });
      
      expect(logger.getLogs()).toHaveLength(1);
    });
  });

  describe('clearLogs', () => {
    it('should clear all logs', () => {
      const logger = Logger.getInstance('test');
      logger.log('test', 'value');
      
      expect(logger.getLogs()).toHaveLength(1);
      
      logger.clearLogs();
      
      expect(logger.getLogs()).toHaveLength(0);
    });

    it('should not affect other logger instances', () => {
      const logger1 = Logger.getInstance('test1');
      const logger2 = Logger.getInstance('test2');
      
      logger1.log('test1', 'value1');
      logger2.log('test2', 'value2');
      
      logger1.clearLogs();
      
      expect(logger1.getLogs()).toHaveLength(0);
      expect(logger2.getLogs()).toHaveLength(1);
    });

    it('should allow adding new logs after clearing', () => {
      const logger = Logger.getInstance('test');
      logger.log('before', 'clear');
      logger.clearLogs();
      logger.log('after', 'clear');
      
      const logs = logger.getLogs();
      expect(logs).toHaveLength(1);
      expect(logs[0].name).toBe('after');
      expect(logs[0].value).toBe('clear');
    });
  });

  describe('formatDateTime', () => {
    it('should format date correctly', () => {
      const logger = Logger.getInstance('test');
      const date = new Date(2023, 0, 15, 10, 30, 45, 123); // 2023-01-15 10:30:45.123
      
      // @ts-ignore - Private method access for testing
      const formatted = logger.formatDateTime(date);
      
      expect(formatted).toBe('2023-01-15:10-30-45-123');
    });

    it('should pad values with leading zeros', () => {
      const logger = Logger.getInstance('test');
      const date = new Date(2023, 0, 1, 1, 5, 9, 7); // 2023-01-01 01:05:09.007
      
      // @ts-ignore - Private method access for testing
      const formatted = logger.formatDateTime(date);
      
      expect(formatted).toBe('2023-01-01:01-05-09-007');
    });

    it('should handle different months correctly', () => {
      const logger = Logger.getInstance('test');
      
      // Test each month (0-based index in JavaScript Date)
      for (let month = 0; month < 12; month++) {
        const date = new Date(2023, month, 1, 12, 0, 30, 0);
        // @ts-ignore - Private method access for testing
        const formatted = logger.formatDateTime(date);
        const expectedMonth = String(month + 1).padStart(2, '0');
        
        expect(formatted).toBe(`2023-${expectedMonth}-01:12-00-30-000`);
      }
    });
  });
}); 