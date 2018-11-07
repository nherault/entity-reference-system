import { deepCopy, reset } from '../class-utility/class-utility';
import { PoolManager } from '../pool/pool';
import { generateTypeEntityFromReference, isEntityReferenceExist } from './entity-reference-handler';
import { EntitiesReference } from './entity-reference-system.type';

const DEFAULT_INITIAL_POOL_SIZE: number = 50;

/**
 * TODO:
 * - Init with reference
 * - Add new type/Id entityReference
 * - Manage Pool of entities by type/Id
 * - Use Caching for isEntityReferenceExist
 * - Add PoolManager in the constructor (optional), so we can inject a new poolManager
 */
export class EntityReferenceSystem {

    private entityReference: EntitiesReference;
    private entityReferenceByPoolType: any;
    private poolManager: PoolManager;

    constructor() {
        this.entityReference = {};
        this.entityReferenceByPoolType = {};
        this.poolManager = new PoolManager();
    }

    /**
     * TODO
     * @param entityReference
     */
    public init(entityReference: EntitiesReference): EntityReferenceSystem {
        this.entityReference = deepCopy({}, entityReference);

        this.generatePools();
        // TODO:
        // - options to create pools and generate entityReferences?

        return this;
    }

    /**
     * TODO
     * @param entityReference
     */
    public add(entityReference: EntitiesReference): EntityReferenceSystem {
        this.entityReference = deepCopy(this.entityReference, [this.entityReference, entityReference]);

        this.generatePools();

        // TODO:
        // - options to create pools and generate entityReferences?

        return this;
    }

    /**
     * TODO
     * @param entityType
     * @param entityId
     */
    public isEntityReferenceExist(entityType: string, entityId: string): boolean {
        return isEntityReferenceExist(this.entityReference, entityType, entityId);
    }

    /**
     * TODO
     * @param entityType
     * @param entityId
     */
    public generateTypeEntityFromReferenceWithPool(entityType: string, entityId: string): any {
        const poolType = this.generatePoolType(entityType, entityId);
        const objFromPool = this.poolManager.createAndGenerateId(poolType);
        const id = objFromPool.id;
        reset(this.entityReferenceByPoolType[poolType], objFromPool);
        objFromPool.id = id;
        return objFromPool;
    }

    /**
     * TODO
     * @param entityType
     * @param entityId
     */
    public generateTypeEntityFromReference(entityType: string, entityId: string): any {
        const poolType = this.generatePoolType(entityType, entityId);
        return JSON.parse(JSON.stringify(this.entityReferenceByPoolType[poolType]));
    }

    private generatePools(): void {
        this.poolManager.releaseAllPools();
        Object.keys(this.entityReference).forEach((entityType) => {
            Object.keys(this.entityReference[entityType]).forEach((entityId) => {
                const poolType = this.generatePoolType(entityType, entityId);
                const reference = generateTypeEntityFromReference(this.entityReference, entityType, entityId);
                this.entityReferenceByPoolType[poolType] = deepCopy({}, reference);
                this.poolManager.addPool(poolType, DEFAULT_INITIAL_POOL_SIZE, reference);
            });
        });
    }

    private generatePoolType(entityType: string, entityId: string): string {
        return `${entityType}_${entityId}`;
    }
}
