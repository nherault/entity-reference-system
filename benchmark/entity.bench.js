/* eslint-disable */
const Benchmark = require('benchmark');
const EntityReferenceSystem = require('../lib/entity');

const suite = new Benchmark.Suite;

const entitiesReference = {
  "entityType1": {
      "base": {
          "member1": "value1",
          "member2": "value2",
          "member3": "value3",
      },
      "entityId1": {
          "member4": "value4",
          "member5": "value5",
          "member6": "value6",
          "extend": "base",
      },
      "entityId2": {
          "extend": "base",
          "compose": "entityId1",
          "member7": "value7",
      }
  },
  "entityType2": {
      "base": {
          "member1": "value1",
          "member2": "value2",
      },
      "entityId1": {
          "extend": "base",
          "member3": "value3",
          "member5": ["value5", "value6"],
          "compose": [{ "type": "entityType1", "id": "entityId1"}, { "type": "entityType1", "id": "entityId1"}, { "type": "entityType1", "id": "entityId2"}],
      }
  }
};

console.log(EntityReferenceSystem);

const ersd = new EntityReferenceSystem.EntityReferenceSystemDefault();
ersd.init(entitiesReference);
const ersp = new EntityReferenceSystem.EntityReferenceSystemPool();
ersp.init(entitiesReference);

// add tests
suite
.add('entityReferenceHandler.isEntityReferenceExist', () => {
    EntityReferenceSystem.isEntityReferenceExist(entitiesReference, "entityType1", "entityId1");
})
.add('ersd.isEntityReferenceExist', () => {
    ersd.isEntityReferenceExist("entityType1", "entityId1");
})
.add('entityReferenceHandler.generateTypeEntityFromReference', () => {
    EntityReferenceSystem.generateTypeEntityFromReference(entitiesReference, "entityType2", "entityId1");
})
.add('ersp.generateTypeEntityFromReference', () => {
    ersp.generateTypeEntityFromReference("entityType2", "entityId1");
})
.add('ersd.generateTypeEntityFromReference', () => {
    ersd.generateTypeEntityFromReference("entityType2", "entityId1");
})
// add listeners
.on('cycle', (event) => {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
  console.log('Slowest is ' + this.filter('slowest').map('name'));
})
// run async
.run({ 'async': true });
