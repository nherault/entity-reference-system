import { EntitiesReference, EntityReferenceSystem } from './entity-reference-system.type';
/**
 * TODO:
 * - Init with reference
 * - Add new type/Id entityReference
 * - Manage Pool of entities by type/Id
 * - Use Caching for isEntityReferenceExist
 * - Add PoolManager in the constructor (optional), so we can inject a new poolManager
 */
export declare class EntityReferenceSystemPool implements EntityReferenceSystem {
    private entityReference;
    private entityReferenceByPoolType;
    private poolManager;
    constructor();
    /**
     * TODO
     * @param entityReference
     */
    init(entityReference: EntitiesReference): EntityReferenceSystem;
    /**
     * TODO
     * @param entityReference
     */
    add(entityReference: EntitiesReference): EntityReferenceSystem;
    /**
     * TODO
     * @param entityType
     * @param entityId
     */
    isEntityReferenceExist(entityType: string, entityId: string): boolean;
    /**
     * TODO
     * @param entityType
     * @param entityId
     */
    generateTypeEntityFromReference(entityType: string, entityId: string): any;
    private generatePools;
    private generatePoolType;
}
