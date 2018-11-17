"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var class_utility_1 = require("../class-utility/class-utility");
var entity_reference_handler_1 = require("./entity-reference-handler");
/**
 * TODO:
 * - Init with reference
 * - Add new type/Id entityReference
 * - Manage Pool of entities by type/Id
 * - Use Caching for isEntityReferenceExist
 * - Add PoolManager in the constructor (optional), so we can inject a new poolManager
 */
var EntityReferenceSystemDefault = /** @class */ (function () {
    function EntityReferenceSystemDefault() {
        this.entityReference = {};
        this.entityReferenceByType = {};
    }
    /**
     * TODO
     * @param entityReference
     */
    EntityReferenceSystemDefault.prototype.init = function (entityReference) {
        this.entityReference = class_utility_1.deepCopy({}, entityReference);
        this.generateEntityReferenceByType();
        return this;
    };
    /**
     * TODO
     * @param entityReference
     */
    EntityReferenceSystemDefault.prototype.add = function (entityReference) {
        this.entityReference = class_utility_1.deepCopy(this.entityReference, [this.entityReference, entityReference]);
        this.generateEntityReferenceByType();
        return this;
    };
    /**
     * TODO
     * @param entityType
     * @param entityId
     */
    EntityReferenceSystemDefault.prototype.isEntityReferenceExist = function (entityType, entityId) {
        return entity_reference_handler_1.isEntityReferenceExist(this.entityReference, entityType, entityId);
    };
    /**
     * TODO
     * @param entityType
     * @param entityId
     */
    EntityReferenceSystemDefault.prototype.generateTypeEntityFromReference = function (entityType, entityId) {
        var type = this.generateType(entityType, entityId);
        return JSON.parse(JSON.stringify(this.entityReferenceByType[type]));
    };
    EntityReferenceSystemDefault.prototype.generateEntityReferenceByType = function () {
        var _this = this;
        Object.keys(this.entityReference).forEach(function (entityType) {
            Object.keys(_this.entityReference[entityType]).forEach(function (entityId) {
                var type = _this.generateType(entityType, entityId);
                var reference = entity_reference_handler_1.generateTypeEntityFromReference(_this.entityReference, entityType, entityId);
                _this.entityReferenceByType[type] = class_utility_1.deepCopy({}, reference);
            });
        });
    };
    EntityReferenceSystemDefault.prototype.generateType = function (entityType, entityId) {
        return entityType + "_" + entityId;
    };
    return EntityReferenceSystemDefault;
}());
exports.EntityReferenceSystemDefault = EntityReferenceSystemDefault;
//# sourceMappingURL=../../src/src/entity/entity-reference-system.js.map