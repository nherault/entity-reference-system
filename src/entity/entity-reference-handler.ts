import { COPY } from '../utils/utils';
import { ComposeExtendEntity, EntitiesReference } from './entity-reference-system.type';

type getByTypeAndId = (reference: EntitiesReference, type: string, id: string) => any;

export function generateTypeEntityFromReference(reference: EntitiesReference, type: string, id: string,
                                                generateByTypeAndId?: getByTypeAndId) {

    generateByTypeAndId = generateByTypeAndId || defaultGetByTypeAndId;
    let entity = generateByTypeAndId(reference, type, id);
    entity = addInherits(reference, type, entity);
    addCompose(reference, type, entity);
    return entity;
}

export function isEntityReferenceExist(reference: EntitiesReference, type: string, id: string) {
    return type !== undefined && id !== undefined && reference[type] !== undefined && reference[type][id] !== undefined;
}

function addInherits(reference: EntitiesReference, type: string, entity: any) {
    if (entity.extend) {
        const entityExtends = parseComposeExtends(type, entity.extend);
        entityExtends.forEach(() => {
            entity = {
                ...entity,
                ...entityExtends.reduce((acc, currExtends) =>
                    ({...acc, ...generateTypeEntityFromReference(reference, currExtends.type, currExtends.id)}), {}),
            };
        });
        delete entity.extend;
    }
    return entity;
}

function addCompose(reference: EntitiesReference, type: string, entity: any) {
    if (entity.compose) {
        const entityCompose = parseComposeExtends(type, entity.compose);
        entityCompose.forEach((currCompose: ComposeExtendEntity) => {
            entity.composeOf = entity.composeOf || {};
            if (Array.isArray(entity.composeOf[currCompose.type])) {
                entity.composeOf[currCompose.type].push(
                    generateTypeEntityFromReference(reference, currCompose.type, currCompose.id));
            } else if (entity.composeOf[currCompose.type] !== undefined) {
                entity.composeOf[currCompose.type] = [entity.composeOf[currCompose.type]];
                entity.composeOf[currCompose.type].push(
                    generateTypeEntityFromReference(reference, currCompose.type, currCompose.id));
            } else {
                entity.composeOf[currCompose.type]
                    = generateTypeEntityFromReference(reference, currCompose.type, currCompose.id);
            }
        });
        delete entity.compose;
    }
}

function defaultGetByTypeAndId(reference: EntitiesReference, type: string, id: string) {
    return COPY(reference[type][id]);
}

function parseComposeExtends(currentType: string, el: any): ComposeExtendEntity[] {
    if (Array.isArray(el)) {
        return el.map((currEl: any) => parseStringOrObject(currentType, currEl));
    } else {
        return [parseStringOrObject(currentType, el)];
    }
}

function parseStringOrObject(currentType: string, el: string | ComposeExtendEntity): ComposeExtendEntity {
    return typeof el === 'string' ? {type: currentType, id: el} : el;
}
