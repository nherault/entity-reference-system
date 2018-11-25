import { deepCopy } from '../class-utility/class-utility';
import { generateTypeEntityFromReference, isEntityReferenceExist } from './entity-reference-handler';
import { EntitiesReference, EntityReferenceSystem } from './entity-reference-system.type';

/**
 * TODO:
 * - Init with reference
 * - Add new type/Id entityReference
 * - Manage Pool of entities by type/Id
 * - Use Caching for isEntityReferenceExist
 * - Add PoolManager in the constructor (optional), so we can inject a new poolManager
 */
export class EntityReferenceSystemDefault implements EntityReferenceSystem {

    private entityReference: EntitiesReference;
    private entityReferenceByType: any;

    constructor() {
        this.entityReference = {};
        this.entityReferenceByType = {};
    }

    /**
     * TODO
     * @param entityReference
     */
    public init(entityReference: EntitiesReference): EntityReferenceSystem {
        this.entityReference = deepCopy({}, entityReference);
        this.generateEntityReferenceByType();
        return this;
    }

    /**
     * TODO
     * @param entityReference
     */
    public add(entityReference: EntitiesReference): EntityReferenceSystem {
        this.entityReference = deepCopy({}, [this.entityReference, entityReference], true);
        this.generateEntityReferenceByType();
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
    public generateTypeEntityFromReference(entityType: string, entityId: string): any {
        const type = this.generateType(entityType, entityId);
        return JSON.parse(JSON.stringify(this.entityReferenceByType[type]));
    }

    private generateEntityReferenceByType(): void {
        Object.keys(this.entityReference).forEach((entityType) => {
            Object.keys(this.entityReference[entityType]).forEach((entityId) => {
                const type = this.generateType(entityType, entityId);
                const reference = generateTypeEntityFromReference(this.entityReference, entityType, entityId);
                this.entityReferenceByType[type] = deepCopy({}, reference);
            });
        });
    }

    private generateType(entityType: string, entityId: string): string {
        return `${entityType}_${entityId}`;
    }
}
