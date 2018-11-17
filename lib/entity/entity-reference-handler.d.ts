import { EntitiesReference } from './entity-reference-system.type';
declare type getByTypeAndId = (reference: EntitiesReference, type: string, id: string) => any;
export declare function generateTypeEntityFromReference(reference: EntitiesReference, type: string, id: string, generateByTypeAndId?: getByTypeAndId): any;
export declare function isEntityReferenceExist(reference: EntitiesReference, type: string, id: string): boolean;
export {};
