/**
 * Typesafe Object.keys
 */
export const keys = <T extends object>(obj: T): Array<keyof T> =>
  Object.keys(obj) as any;

/**
 * This method transforms object to a new accumulator object which is the result of running each of its own enumerable
 * string keyed properties thru iteratee, with each invocation potentially mutating the accumulator object.
 */
export const transform = <T extends Object, U extends Object>(
  object: T,
  iteratee: <K extends keyof T>(result: U, key: K, value: T[K]) => void,
  accumulator: U
): U =>
  keys(object).reduce((result, key) => {
    iteratee(result, key, object[key]);
    return result;
  }, accumulator);
