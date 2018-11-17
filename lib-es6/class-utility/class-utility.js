/**
 * Initialize the class with inits, ONLY FIRST LEVEL applies
 * @param classTobeInitialized
 * @param inits
 */
export function initializer(classTobeInitialized, inits) {
    var keys = Object.keys(inits);
    for (var i = 0, l = keys.length; i < l; i++) {
        var key = keys[i];
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
export function reset(reference, objToReset, isResetUnknownProperties) {
    if (isResetUnknownProperties === void 0) { isResetUnknownProperties = true; }
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
export function applyMixins(destination, sources) {
    var sourcesToMixinFrom = sources.constructor === Array ? sources : [sources];
    sourcesToMixinFrom.forEach(function (source) {
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
export function deepCopy(destination, sources, resetArray) {
    if (resetArray === void 0) { resetArray = false; }
    var sourcesToCopyFrom = sources.constructor === Array ? sources : [sources];
    sourcesToCopyFrom.forEach(function (source) {
        destination = internalDeepCopy(destination, source, resetArray);
    });
    return destination;
}
//////////////////////////////
// PRIVATES
//////////////////////////////
function resetUnknownProperties(reference, objToReset) {
    var keys = Object.keys(objToReset);
    for (var i = 0, l = keys.length; i < l; i++) {
        var key = keys[i];
        if (reference[key] === undefined) {
            objToReset[key] = undefined;
        }
        else if (typeof reference[key] === 'object') {
            objToReset[key] = resetUnknownProperties(reference[key], objToReset[key]);
        }
    }
    return objToReset;
}
function internalDeepCopy(target, source, resetArray) {
    if (typeof source === 'object') {
        target = source.constructor === Array
            ? copyFromArray(target, source, resetArray) : copyFromObject(target, source, resetArray);
    }
    else {
        target = source;
    }
    return target;
}
function copyFromObject(target, source, resetArray) {
    if (target === undefined) {
        target = {};
    }
    var keys = Object.keys(source);
    for (var i = 0, l = keys.length; i < l; i++) {
        var key = keys[i];
        var sourceValue = source[key];
        if (sourceValue !== undefined) {
            target[key] = internalDeepCopy(target[key], sourceValue, resetArray);
        }
    }
    return target;
}
function copyFromArray(target, source, resetArray) {
    var l = source.length;
    if (target && target.constructor === Array) {
        if (resetArray) {
            target = [];
        }
        for (var i = 0; i < l; i++) {
            target.push(internalDeepCopy(undefined, source[i], resetArray));
        }
    }
    else {
        target = [];
        for (var i = 0; i < l; i++) {
            target[i] = internalDeepCopy(target[i], source[i], resetArray);
        }
    }
    return target;
}
function objectExtend(destination, source) {
    var keys = Object.keys(source);
    for (var i = 0, l = keys.length; i < l; i++) {
        var key = keys[i];
        if (source.hasOwnProperty(key)) {
            if (destination[key] === undefined || destination[key] === null) {
                destination[key] = JSON.parse(JSON.stringify(source[key]));
            }
            else {
                if (source[key].constructor === Array) {
                    destination[key] = arrayExtend(destination[key], source[key]);
                }
                else if (typeof source[key] === 'object') {
                    destination[key] = JSON.parse(JSON.stringify(objectExtend(destination[key], source[key])));
                }
                else {
                    destination[key] = source[key];
                }
            }
        }
    }
    return destination;
}
function arrayExtend(destination, source) {
    if (destination.constructor === Array) {
        return destination.concat(JSON.parse(JSON.stringify(source)));
    }
    else {
        return JSON.parse(JSON.stringify(source));
    }
}
//# sourceMappingURL=../../src/src/class-utility/class-utility.js.map