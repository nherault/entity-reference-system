import { PoolManager } from './pool';
describe('pool', function () {
    describe('PoolManager', function () {
        it('addPool', function () {
            var poolManager = new PoolManager();
            var pool = poolManager.addPool('myPool', 50, { name: 'entityName' });
            expect(pool.id).toBe('myPool');
        });
        it('expandPool', function () {
            var poolManager = new PoolManager();
            poolManager.addPool('myPool', 50, { name: 'entityName' });
            expect(poolManager.freeObjectSize('myPool')).toBe(50);
            poolManager.expandPool('myPool', 50);
            expect(poolManager.freeObjectSize('myPool')).toBe(100);
        });
        it('createAndGenerateId', function () {
            var poolManager = new PoolManager();
            poolManager.addPool('myPool', 1, { name: 'entityName' }, 3, 1);
            var entity1 = poolManager.createAndGenerateId('myPool');
            var entity2 = poolManager.createAndGenerateId('myPool');
            var entity3 = poolManager.createAndGenerateId('myPool');
            var entity4 = poolManager.createAndGenerateId('myPool');
            var entity5 = poolManager.createAndGenerateId('myPool');
            expect(poolManager.currentSize('myPool')).toBe(5);
            expect(poolManager.freeIdSize('myPool')).toBe(0);
            expect(poolManager.freeObjectSize('myPool')).toBe(2);
            var currentEntities = poolManager.getCurrents('myPool');
            expect(currentEntities[0]).toBe(entity1);
            expect(currentEntities[1]).toBe(entity2);
            expect(currentEntities[2]).toBe(entity3);
            expect(currentEntities[3]).toBe(entity4);
            expect(currentEntities[4]).toBe(entity5);
        });
        it('getCurrents', function () {
            var poolManager = new PoolManager();
            poolManager.addPool('myPool', 50, { name: 'entityName' });
            var entity1 = poolManager.createAndGenerateId('myPool');
            var entity2 = poolManager.createAndGenerateId('myPool');
            var entity3 = poolManager.createAndGenerateId('myPool');
            expect(poolManager.currentSize('myPool')).toBe(3);
            var currentEntities = poolManager.getCurrents('myPool');
            expect(currentEntities.length).toBe(3);
            expect(currentEntities[0]).toBe(entity1);
            expect(currentEntities[1]).toBe(entity2);
            expect(currentEntities[2]).toBe(entity3);
        });
        it('release', function () {
            var poolManager = new PoolManager();
            poolManager.addPool('myPool', 50, { name: 'entityName' });
            var entity1 = poolManager.createAndGenerateId('myPool');
            poolManager.createAndGenerateId('myPool');
            poolManager.createAndGenerateId('myPool');
            expect(poolManager.currentSize('myPool')).toBe(3);
            poolManager.release('myPool', entity1);
            expect(poolManager.currentSize('myPool')).toBe(2);
        });
        it('releaseById', function () {
            var poolManager = new PoolManager();
            poolManager.addPool('myPool', 50, { name: 'entityName' });
            var entity1 = poolManager.createAndGenerateId('myPool');
            poolManager.createAndGenerateId('myPool');
            poolManager.createAndGenerateId('myPool');
            expect(poolManager.currentSize('myPool')).toBe(3);
            poolManager.releaseById('myPool', entity1.id);
            expect(poolManager.currentSize('myPool')).toBe(2);
        });
        it('releaseAll', function () {
            var poolManager = new PoolManager();
            poolManager.addPool('myPool', 50, { name: 'entityName' });
            poolManager.createAndGenerateId('myPool');
            poolManager.createAndGenerateId('myPool');
            poolManager.createAndGenerateId('myPool');
            expect(poolManager.currentSize('myPool')).toBe(3);
            poolManager.releaseAll('myPool');
            expect(poolManager.currentSize('myPool')).toBe(0);
        });
        it('releaseAllPools', function () {
            var poolManager = new PoolManager();
            poolManager.addPool('myPool', 50, { name: 'entityName' });
            poolManager.createAndGenerateId('myPool');
            poolManager.createAndGenerateId('myPool');
            poolManager.createAndGenerateId('myPool');
            expect(poolManager.currentSize('myPool')).toBe(3);
            poolManager.addPool('myPool2', 50, { name: 'entityName' });
            poolManager.createAndGenerateId('myPool2');
            poolManager.createAndGenerateId('myPool2');
            expect(poolManager.currentSize('myPool2')).toBe(2);
            poolManager.releaseAllPools();
            expect(poolManager.currentSize('myPool')).toBe(0);
            expect(poolManager.currentSize('myPool2')).toBe(0);
        });
        it('getById', function () {
            var poolManager = new PoolManager();
            poolManager.addPool('myPool', 50, { name: 'entityName' });
            var myEntity = poolManager.createAndGenerateId('myPool');
            expect(poolManager.getById('myPool', myEntity.id)).toBe(myEntity);
        });
        it('getPool', function () {
            var poolManager = new PoolManager();
            var pool = poolManager.addPool('myPool', 50, { name: 'entityName' });
            expect(poolManager.getPool('myPool')).toBe(pool);
        });
        it('isPoolExist', function () {
            var poolManager = new PoolManager();
            poolManager.addPool('myPool', 50, { name: 'entityName' });
            expect(poolManager.isPoolExist('myPool')).toBe(true);
            expect(poolManager.isPoolExist('myPool2')).toBe(false);
        });
        it('currentSize', function () {
            var poolManager = new PoolManager();
            poolManager.addPool('myPool', 50, { name: 'entityName' });
            expect(poolManager.currentSize('myPool')).toBe(0);
            poolManager.createAndGenerateId('myPool');
            expect(poolManager.currentSize('myPool')).toBe(1);
        });
        it('freeIdSize', function () {
            var poolManager = new PoolManager();
            poolManager.addPool('myPool', 50, { name: 'entityName' });
            expect(poolManager.freeIdSize('myPool')).toBe(0);
            var entity1 = poolManager.createAndGenerateId('myPool');
            poolManager.createAndGenerateId('myPool');
            poolManager.createAndGenerateId('myPool');
            poolManager.releaseById('myPool', entity1.id);
            expect(poolManager.freeIdSize('myPool')).toBe(1);
        });
        it('freeObjectSize', function () {
            var poolManager = new PoolManager();
            poolManager.addPool('myPool', 50, { name: 'entityName' });
            expect(poolManager.freeObjectSize('myPool')).toBe(50);
            poolManager.createAndGenerateId('myPool');
            expect(poolManager.freeObjectSize('myPool')).toBe(49);
        });
        it('getSafeCurrents', function () {
            var poolManager = new PoolManager();
            poolManager.addPool('myPool', 50, { name: 'entityName' });
            var entity1 = poolManager.createAndGenerateId('myPool');
            poolManager.createAndGenerateId('myPool');
            poolManager.createAndGenerateId('myPool');
            expect(poolManager.currentSize('myPool')).toBe(3);
            poolManager.releaseById('myPool', entity1.id);
            expect(poolManager.getSafeCurrents('myPool').length).toBe(2);
        });
    });
});
//# sourceMappingURL=../../src/src/pool/pool.spec.js.map