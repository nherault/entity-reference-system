import { generateTypeEntityFromReference, isEntityReferenceExist } from './entity-reference-handler';

describe('entity reference', () => {

    const entitiesReference = {
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

    describe('isEntityReferenceExist', () => {
      it('isEntityReferenceExist - unknow', () => {
        expect(isEntityReferenceExist(entitiesReference, 'toto', 'toto')).toBeFalsy();
        expect(isEntityReferenceExist(entitiesReference, 'entityType1', 'toto')).toBeFalsy();
      });

      it('isEntityReferenceExist - exist', () => {
        expect(isEntityReferenceExist(entitiesReference, 'entityType1', 'entityId1')).toBeTruthy();
        expect(isEntityReferenceExist(entitiesReference, 'entityType1', 'base')).toBeTruthy();
        expect(isEntityReferenceExist(entitiesReference, 'entityType2', 'entityId1')).toBeTruthy();
      });
    });

    describe('generateTypeEntityFromReference', () => {
        it('with extends', () => {
            expect(generateTypeEntityFromReference(entitiesReference, 'entityType1', 'entityId1')).toEqual({
                member1: 'value1',
                member2: 'value2',
                member3: 'value3',
                member4: 'value4',
                member5: 'value5',
                member6: 'value6',
            });
        });

        it('with extends and compose', () => {
            expect(generateTypeEntityFromReference(entitiesReference, 'entityType1', 'entityId2')).toEqual({
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

        it('with extends and compose from another entity type', () => {
            expect(generateTypeEntityFromReference(entitiesReference, 'entityType2', 'entityId1')).toEqual({
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
