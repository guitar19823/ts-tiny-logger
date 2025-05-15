import { LogEntry, ILogger } from '../types';
import { Logger } from '../logger';

describe('Types', () => {
  describe('LogEntry interface', () => {
    it('should define the correct structure', () => {
      const logEntry: LogEntry = {
        dateTime: '2023-01-01:10-30-123',
        name: 'test',
        value: 'value'
      };
      
      expect(logEntry).toHaveProperty('dateTime');
      expect(logEntry).toHaveProperty('name');
      expect(logEntry).toHaveProperty('value');
    });
  });
  
  describe('ILogger interface', () => {
    it('should be implemented by Logger class', () => {
      const logger = Logger.getInstance('test');
      
      expect(typeof logger.log).toBe('function');
      expect(typeof logger.getLogs).toBe('function');
      expect(typeof logger.clearLogs).toBe('function');
    });
  });
}); 