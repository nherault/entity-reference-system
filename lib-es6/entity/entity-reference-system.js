import { deepCopy } from '../class-utility/class-utility';
import { generateTypeEntityFromReference, isEntityReferenceExist } from './entity-reference-handler';
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
        this.entityReference = deepCopy({}, entityReference);
        this.generateEntityReferenceByType();
        return this;
    };
    /**
     * TODO
     * @param entityReference
     */
    EntityReferenceSystemDefault.prototype.add = function (entityReference) {
        this.entityReference = deepCopy({}, [this.entityReference, entityReference], true);
        this.generateEntityReferenceByType();
        return this;
    };
    /**
     * TODO
     * @param entityType
     * @param entityId
     */
    EntityReferenceSystemDefault.prototype.isEntityReferenceExist = function (entityType, entityId) {
        return isEntityReferenceExist(this.entityReference, entityType, entityId);
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
                var reference = generateTypeEntityFromReference(_this.entityReference, entityType, entityId);
                _this.entityReferenceByType[type] = deepCopy({}, reference);
            });
        });
    };
    EntityReferenceSystemDefault.prototype.generateType = function (entityType, entityId) {
        return entityType + "_" + entityId;
    };
    return EntityReferenceSystemDefault;
}());
export { EntityReferenceSystemDefault };
//# sourceMappingURL=../../src/src/entity/entity-reference-system.js.map