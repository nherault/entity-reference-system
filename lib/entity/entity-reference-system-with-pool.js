"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var class_utility_1 = require("../class-utility/class-utility");
var pool_1 = require("../pool/pool");
var entity_reference_handler_1 = require("./entity-reference-handler");
var DEFAULT_INITIAL_POOL_SIZE = 50;
/**
 * TODO:
 * - Init with reference
 * - Add new type/Id entityReference
 * - Manage Pool of entities by type/Id
 * - Use Caching for isEntityReferenceExist
 * - Add PoolManager in the constructor (optional), so we can inject a new poolManager
 */
var EntityReferenceSystemPool = /** @class */ (function () {
    function EntityReferenceSystemPool() {
        this.entityReference = {};
        this.entityReferenceByPoolType = {};
        this.poolManager = new pool_1.PoolManager();
    }
    /**
     * TODO
     * @param entityReference
     */
    EntityReferenceSystemPool.prototype.init = function (entityReference) {
        this.entityReference = class_utility_1.deepCopy({}, entityReference);
        this.generatePools();
        // TODO:
        // - options to create pools and generate entityReferences?
        return this;
    };
    /**
     * TODO
     * @param entityReference
     */
    EntityReferenceSystemPool.prototype.add = function (entityReference) {
        this.entityReference = class_utility_1.deepCopy(this.entityReference, [this.entityReference, entityReference]);
        this.generatePools();
        // TODO:
        // - options to create pools and generate entityReferences?
        return this;
    };
    /**
     * TODO
     * @param entityType
     * @param entityId
     */
    EntityReferenceSystemPool.prototype.isEntityReferenceExist = function (entityType, entityId) {
        return entity_reference_handler_1.isEntityReferenceExist(this.entityReference, entityType, entityId);
    };
    /**
     * TODO
     * @param entityType
     * @param entityId
     */
    EntityReferenceSystemPool.prototype.generateTypeEntityFromReference = function (entityType, entityId) {
        var poolType = this.generatePoolType(entityType, entityId);
        var objFromPool = this.poolManager.createAndGenerateId(poolType);
        var id = objFromPool.id;
        class_utility_1.reset(this.entityReferenceByPoolType[poolType], objFromPool);
        objFromPool.id = id;
        return objFromPool;
    };
    EntityReferenceSystemPool.prototype.generatePools = function () {
        var _this = this;
        this.poolManager.releaseAllPools();
        Object.keys(this.entityReference).forEach(function (entityType) {
            Object.keys(_this.entityReference[entityType]).forEach(function (entityId) {
                var poolType = _this.generatePoolType(entityType, entityId);
                var reference = entity_reference_handler_1.generateTypeEntityFromReference(_this.entityReference, entityType, entityId);
                _this.entityReferenceByPoolType[poolType] = class_utility_1.deepCopy({}, reference);
                _this.poolManager.addPool(poolType, DEFAULT_INITIAL_POOL_SIZE, reference);
            });
        });
    };
    EntityReferenceSystemPool.prototype.generatePoolType = function (entityType, entityId) {
        return entityType + "_" + entityId;
    };
    return EntityReferenceSystemPool;
}());
exports.EntityReferenceSystemPool = EntityReferenceSystemPool;
//# sourceMappingURL=../../src/src/entity/entity-reference-system-with-pool.js.map