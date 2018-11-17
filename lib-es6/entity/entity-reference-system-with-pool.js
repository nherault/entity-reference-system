import { deepCopy, reset } from '../class-utility/class-utility';
import { PoolManager } from '../pool/pool';
import { generateTypeEntityFromReference, isEntityReferenceExist } from './entity-reference-handler';
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
        this.poolManager = new PoolManager();
    }
    /**
     * TODO
     * @param entityReference
     */
    EntityReferenceSystemPool.prototype.init = function (entityReference) {
        this.entityReference = deepCopy({}, entityReference);
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
        this.entityReference = deepCopy(this.entityReference, [this.entityReference, entityReference]);
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
        return isEntityReferenceExist(this.entityReference, entityType, entityId);
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
        reset(this.entityReferenceByPoolType[poolType], objFromPool);
        objFromPool.id = id;
        return objFromPool;
    };
    EntityReferenceSystemPool.prototype.generatePools = function () {
        var _this = this;
        this.poolManager.releaseAllPools();
        Object.keys(this.entityReference).forEach(function (entityType) {
            Object.keys(_this.entityReference[entityType]).forEach(function (entityId) {
                var poolType = _this.generatePoolType(entityType, entityId);
                var reference = generateTypeEntityFromReference(_this.entityReference, entityType, entityId);
                _this.entityReferenceByPoolType[poolType] = deepCopy({}, reference);
                _this.poolManager.addPool(poolType, DEFAULT_INITIAL_POOL_SIZE, reference);
            });
        });
    };
    EntityReferenceSystemPool.prototype.generatePoolType = function (entityType, entityId) {
        return entityType + "_" + entityId;
    };
    return EntityReferenceSystemPool;
}());
export { EntityReferenceSystemPool };
//# sourceMappingURL=../../src/src/entity/entity-reference-system-with-pool.js.map