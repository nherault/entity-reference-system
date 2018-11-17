import { EntityReferenceSystemDefault } from './entity-reference-system';
describe('entity reference system', function () {
    var entitiesReference = {
        entityType1: {
            base: {
                member1: 'value1',
                member2: 'value2',
                member3: 'value3',
            },
            entityId1: {
                extend: 'base',
                member4: 'value4',
                member5: 'value5',
                member6: 'value6',
            },
            entityId2: {
                compose: 'entityId1',
                extend: 'base',
                member7: 'value7',
            },
        },
        entityType2: {
            base: {
                member1: 'value1',
                member2: 'value2',
            },
            entityId1: {
                compose: [{
                        id: 'entityId1',
                        type: 'entityType1',
                    }, {
                        id: 'entityId1',
                        type: 'entityType1',
                    }, {
                        id: 'entityId2',
                        type: 'entityType1',
                    }],
                extend: 'base',
                member3: 'value3',
                member5: ['value5', 'value6'],
            },
        },
    };
    var entityReferenceSystem = new EntityReferenceSystemDefault();
    describe('init', function () {
        it('init', function () {
            entityReferenceSystem.init(entitiesReference);
            expect(entityReferenceSystem.isEntityReferenceExist('toto', 'toto')).toBeFalsy();
            expect(entityReferenceSystem.isEntityReferenceExist('entityType1', 'toto')).toBeFalsy();
            expect(entityReferenceSystem.isEntityReferenceExist('entityType1', 'entityId1')).toBeTruthy();
            expect(entityReferenceSystem.isEntityReferenceExist('entityType1', 'base')).toBeTruthy();
            expect(entityReferenceSystem.isEntityReferenceExist('entityType2', 'entityId1')).toBeTruthy();
        });
    });
    describe('add', function () {
        it('add', function () {
            entityReferenceSystem.init(entitiesReference);
            expect(entityReferenceSystem.isEntityReferenceExist('toto', 'toto')).toBeFalsy();
            expect(entityReferenceSystem.isEntityReferenceExist('entityType1', 'toto')).toBeFalsy();
            entityReferenceSystem.add({ toto: { toto: { props1: 1 } } });
            expect(entityReferenceSystem.isEntityReferenceExist('toto', 'toto')).toBeTruthy();
            expect(entityReferenceSystem.isEntityReferenceExist('entityType1', 'toto')).toBeFalsy();
        });
    });
    describe('generateTypeEntityFromReference', function () {
        it('with extends and compose', function () {
            entityReferenceSystem.init(entitiesReference);
            expect(entityReferenceSystem.generateTypeEntityFromReference('entityType1', 'entityId2')).toEqual({
                composeOf: {
                    entityType1: {
                        member1: 'value1',
                        member2: 'value2',
                        member3: 'value3',
                        member4: 'value4',
                        member5: 'value5',
                        member6: 'value6',
                    },
                },
                member1: 'value1',
                member2: 'value2',
                member3: 'value3',
                member7: 'value7',
            });
        });
        it('with extends and compose from another entity type', function () {
            entityReferenceSystem.init(entitiesReference);
            expect(entityReferenceSystem.generateTypeEntityFromReference('entityType2', 'entityId1')).toEqual({
                composeOf: {
                    entityType1: [{
                            member1: 'value1',
                            member2: 'value2',
                            member3: 'value3',
                            member4: 'value4',
                            member5: 'value5',
                            member6: 'value6',
                        }, {
                            member1: 'value1',
                            member2: 'value2',
                            member3: 'value3',
                            member4: 'value4',
                            member5: 'value5',
                            member6: 'value6',
                        }, {
                            composeOf: {
                                entityType1: {
                                    member1: 'value1',
                                    member2: 'value2',
                                    member3: 'value3',
                                    member4: 'value4',
                                    member5: 'value5',
                                    member6: 'value6',
                                },
                            },
                            member1: 'value1',
                            member2: 'value2',
                            member3: 'value3',
                            member7: 'value7',
                        }],
                },
                member1: 'value1',
                member2: 'value2',
                member3: 'value3',
                member5: ['value5', 'value6'],
            });
        });
    });
});
//# sourceMappingURL=../../src/src/entity/entity-reference-system.spec.js.map