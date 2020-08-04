/**
 * Typesafe Object.keys
 */
export const keys = <T extends object>(obj: T): Array<keyof T> =>
  Object.keys(obj) as any;
