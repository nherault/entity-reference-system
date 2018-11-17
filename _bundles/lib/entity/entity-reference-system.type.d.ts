export interface EntityReferenceSystem {
    init(entityReference: EntitiesReference): EntityReferenceSystem;
    add(entityReference: EntitiesReference): EntityReferenceSystem;
    isEntityReferenceExist(entityType: string, entityId: string): boolean;
    generateTypeEntityFromReference(entityType: string, entityId: string): any;
}
export interface EntityReference {
    [props: string]: any;
    extend?: any;
    compose?: any;
}
export interface EntitiesReference {
    [entityType: string]: {
        [entityId: string]: EntityReference;
    };
}
export interface ComposeExtendEntity {
    type: string;
    id: string;
}
