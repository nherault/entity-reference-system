"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var entity_reference_handler_1 = require("./entity-reference-handler");
describe('entity reference', function () {
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
    describe('isEntityReferenceExist', function () {
        it('isEntityReferenceExist - unknow', function () {
            expect(entity_reference_handler_1.isEntityReferenceExist(entitiesReference, 'toto', 'toto')).toBeFalsy();
            expect(entity_reference_handler_1.isEntityReferenceExist(entitiesReference, 'entityType1', 'toto')).toBeFalsy();
        });
        it('isEntityReferenceExist - exist', function () {
            expect(entity_reference_handler_1.isEntityReferenceExist(entitiesReference, 'entityType1', 'entityId1')).toBeTruthy();
            expect(entity_reference_handler_1.isEntityReferenceExist(entitiesReference, 'entityType1', 'base')).toBeTruthy();
            expect(entity_reference_handler_1.isEntityReferenceExist(entitiesReference, 'entityType2', 'entityId1')).toBeTruthy();
        });
    });
    describe('generateTypeEntityFromReference', function () {
        it('with extends', function () {
            expect(entity_reference_handler_1.generateTypeEntityFromReference(entitiesReference, 'entityType1', 'entityId1')).toEqual({
                member1: 'value1',
                member2: 'value2',
                member3: 'value3',
                member4: 'value4',
                member5: 'value5',
                member6: 'value6',
            });
        });
        it('with extends and compose', function () {
            expect(entity_reference_handler_1.generateTypeEntityFromReference(entitiesReference, 'entityType1', 'entityId2')).toEqual({
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
            expect(entity_reference_handler_1.generateTypeEntityFromReference(entitiesReference, 'entityType2', 'entityId1')).toEqual({
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
//# sourceMappingURL=../../src/src/entity/entity-reference-handler.spec.js.map