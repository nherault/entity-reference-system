/**
 * Initialize the class with inits, ONLY FIRST LEVEL applies
 * @param classTobeInitialized
 * @param inits
 */
export declare function initializer(classTobeInitialized: any, inits: any): any;
/**
 * Reset the object to have the same structure and values has the reference
 * @param reference
 * @param objToReset
 */
export declare function reset(reference: any, objToReset: any, isResetUnknownProperties?: boolean): any;
/**
 * Apply a mixin from multiple sources to the destination object
 * @param destination
 * @param sources
 */
export declare function applyMixins(destination: any, sources: any | any[]): any;
/**
 * Deep Copy all the properties from the sources to the target
 * @param target
 * @param source
 * @param resetArray
 */
export declare function deepCopy(destination: any, sources: any | any[], resetArray?: boolean): any;
