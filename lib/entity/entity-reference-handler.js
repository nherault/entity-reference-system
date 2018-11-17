"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils/utils");
function generateTypeEntityFromReference(reference, type, id, generateByTypeAndId) {
    generateByTypeAndId = generateByTypeAndId || defaultGetByTypeAndId;
    var entity = generateByTypeAndId(reference, type, id);
    entity = addInherits(reference, type, entity);
    addCompose(reference, type, entity);
    return entity;
}
exports.generateTypeEntityFromReference = generateTypeEntityFromReference;
function isEntityReferenceExist(reference, type, id) {
    return type !== undefined && id !== undefined && reference[type] !== undefined && reference[type][id] !== undefined;
}
exports.isEntityReferenceExist = isEntityReferenceExist;
function addInherits(reference, type, entity) {
    if (entity.extend) {
        var entityExtends_1 = parseComposeExtends(type, entity.extend);
        entityExtends_1.forEach(function () {
            entity = __assign({}, entity, entityExtends_1.reduce(function (acc, currExtends) {
                return (__assign({}, acc, generateTypeEntityFromReference(reference, currExtends.type, currExtends.id)));
            }, {}));
        });
        delete entity.extend;
    }
    return entity;
}
function addCompose(reference, type, entity) {
    if (entity.compose) {
        var entityCompose = parseComposeExtends(type, entity.compose);
        entityCompose.forEach(function (currCompose) {
            entity.composeOf = entity.composeOf || {};
            if (Array.isArray(entity.composeOf[currCompose.type])) {
                entity.composeOf[currCompose.type].push(generateTypeEntityFromReference(reference, currCompose.type, currCompose.id));
            }
            else if (entity.composeOf[currCompose.type] !== undefined) {
                entity.composeOf[currCompose.type] = [entity.composeOf[currCompose.type]];
                entity.composeOf[currCompose.type].push(generateTypeEntityFromReference(reference, currCompose.type, currCompose.id));
            }
            else {
                entity.composeOf[currCompose.type]
                    = generateTypeEntityFromReference(reference, currCompose.type, currCompose.id);
            }
        });
        delete entity.compose;
    }
}
function defaultGetByTypeAndId(reference, type, id) {
    return utils_1.COPY(reference[type][id]);
}
function parseComposeExtends(currentType, el) {
    if (Array.isArray(el)) {
        return el.map(function (currEl) { return parseStringOrObject(currentType, currEl); });
    }
    else {
        return [parseStringOrObject(currentType, el)];
    }
}
function parseStringOrObject(currentType, el) {
    return typeof el === 'string' ? { type: currentType, id: el } : el;
}
//# sourceMappingURL=../../src/src/entity/entity-reference-handler.js.map