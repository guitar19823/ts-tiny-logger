import * as indexExports from '../index';
import { Logger } from '../logger';

describe('Index exports', () => {
  it('should export Logger class', () => {
    expect(indexExports.Logger).toBe(Logger);
  });
  
  // Note: Since TypeScript interfaces are removed during compilation,
  // we can only verify that exports are properly defined in TypeScript 
  // but we can't test their existence at runtime.
  // The type coverage is ensured by the TypeScript compiler.
}); 