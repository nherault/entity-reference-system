/**
 * Initialize the class with inits, ONLY FIRST LEVEL applies
 * @param classTobeInitialized
 * @param inits
 */
export function initializer(classTobeInitialized: any, inits: any): any {
  const keys = Object.keys(inits);
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i];
    if (inits.hasOwnProperty(key)) {
      classTobeInitialized[key] = inits[key];
    }
  }

  return classTobeInitialized;
}

/**
 * Reset the object to have the same structure and values has the reference
 * @param reference
 * @param objToReset
 */
export function reset(reference: any, objToReset: any, isResetUnknownProperties = true): any {
  objToReset = internalDeepCopy(objToReset, reference, true);
  if (isResetUnknownProperties) {
    objToReset = resetUnknownProperties(reference, objToReset);
  }
  return objToReset;
}

/**
 * Apply a mixin from multiple sources to the destination object
 * @param destination
 * @param sources
 */
export function applyMixins(destination: any, sources: any | any[]): any {
  const sourcesToMixinFrom: any[] = sources.constructor === Array ? sources : [sources];
  sourcesToMixinFrom.forEach((source) => {
    destination = objectExtend(destination, source);
  });

  return destination;
}

/**
 * Deep Copy all the properties from the sources to the target
 * @param target
 * @param source
 * @param resetArray
 */
export function deepCopy(destination: any, sources: any | any[], resetArray = false): any {
  const sourcesToCopyFrom: any[] = sources.constructor === Array ? sources : [sources];
  sourcesToCopyFrom.forEach((source) => {
    destination = internalDeepCopy(destination, source, resetArray);
  });

  return destination;
}

//////////////////////////////
// PRIVATES
//////////////////////////////

function resetUnknownProperties(reference: any, objToReset: any): any {
  const keys = Object.keys(objToReset);
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i];
    if (reference[key] === undefined) {
      objToReset[key] = undefined;
    } else if (typeof reference[key] === 'object') {
      objToReset[key] = resetUnknownProperties(reference[key], objToReset[key]);
    }
  }
  return objToReset;
}

function internalDeepCopy(target: any, source: any, resetArray: boolean): any {

  if (typeof source === 'object') {
    target = source.constructor === Array
      ? copyFromArray(target, source, resetArray) : copyFromObject(target, source, resetArray);
  } else {
    target = source;
  }

  return target;
}

function copyFromObject(target: any | undefined, source: any, resetArray: boolean): any {
  if (target === undefined) {
    target = {};
  }
  const keys = Object.keys(source);
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i];
    const sourceValue = source[key];
    if (sourceValue !== undefined) {
      target[key] = internalDeepCopy(target[key], sourceValue, resetArray);
    }
  }

  return target;
}

function copyFromArray(target: any, source: any[], resetArray: boolean): any[] {

  const l = source.length;
  if (target && target.constructor === Array) {
    if (resetArray) {
      target = [];
    }
    for (let i = 0; i < l; i++) {
      target.push(internalDeepCopy(undefined, source[i], resetArray));
    }
  } else {
    target = [];
    for (let i = 0; i < l; i++) {
      target[i] = internalDeepCopy(target[i], source[i], resetArray);
    }
  }
  return target;
}

function objectExtend(destination: any, source: any): any {
  const keys = Object.keys(source);
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i];
    if (source.hasOwnProperty(key)) {
      if (destination[key] === undefined || destination[key] === null) {
        destination[key] = JSON.parse(JSON.stringify(source[key]));
      } else {
        if (source[key].constructor === Array) {
          destination[key] = arrayExtend(destination[key], source[key]);
        } else if (typeof source[key] === 'object') {
          destination[key] = JSON.parse(JSON.stringify(objectExtend(destination[key], source[key])));
        } else {
          destination[key] = source[key];
        }
      }
    }
  }
  return destination;
}

function arrayExtend(destination: any, source: any[]): any {
  if (destination.constructor === Array) {
    return destination.concat(JSON.parse(JSON.stringify(source)));
  } else {
    return JSON.parse(JSON.stringify(source));
  }
}
