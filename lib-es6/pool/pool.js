var initialPool = {
    currentObjects: [],
    expandFactor: 0.2,
    expandMinUnits: 32,
    freeIndexes: [],
    freeList: [],
    id: '',
    reference: {},
};
var PoolManager = /** @class */ (function () {
    function PoolManager() {
        this.pools = {};
    }
    PoolManager.prototype.addPool = function (poolId, initialSize, reference, expandMinUnits, expandFactor) {
        if (expandMinUnits === void 0) { expandMinUnits = 32; }
        if (expandFactor === void 0) { expandFactor = 0.2; }
        this.pools[poolId] = JSON.parse(JSON.stringify(initialPool));
        this.pools[poolId].expandMinUnits = expandMinUnits;
        this.pools[poolId].expandFactor = expandFactor;
        this.pools[poolId].reference = reference;
        this.pools[poolId].id = poolId;
        this.expandPool(poolId, initialSize);
        return this.pools[poolId];
    };
    PoolManager.prototype.expandPool = function (poolId, nbToExpand) {
        var pool = this.pools[poolId];
        for (var i = 0; i < nbToExpand; i++) {
            pool.freeList.push(JSON.parse(JSON.stringify(pool.reference)));
        }
        return this;
    };
    PoolManager.prototype.createAndGenerateId = function (type) {
        // Create more if the free list is empty
        var currentPool = this.pools[type];
        if (currentPool.freeList.length <= 0) {
            var growth = Math.ceil(currentPool.freeList.length * currentPool.expandFactor);
            if (growth < currentPool.expandMinUnits) {
                growth = currentPool.expandMinUnits;
            }
            this.expandPool(type, growth);
        }
        // Get a new object.
        var newObject = currentPool.freeList.pop();
        // Get a free id
        var objectId = currentPool.freeIndexes.pop();
        if (objectId === undefined) {
            objectId = currentPool.currentObjects.length;
        }
        // Set the id and the object to the pool
        newObject.id = objectId;
        currentPool.currentObjects[objectId] = newObject;
        return newObject;
    };
    PoolManager.prototype.getCurrents = function (type) {
        return this.pools[type].currentObjects;
    };
    PoolManager.prototype.release = function (type, pooledObject) {
        return this.releaseById(type, pooledObject.id);
    };
    PoolManager.prototype.releaseById = function (type, id) {
        var currentPool = this.pools[type];
        var obj = currentPool.currentObjects[id];
        if (obj && obj.id !== undefined) {
            // Add the object to the free list
            currentPool.freeList.push(obj);
            // Add the id to the freeIndexes
            currentPool.freeIndexes.push(obj.id);
            // Delete in the object list
            currentPool.currentObjects[obj.id] = undefined;
        }
        return this;
    };
    PoolManager.prototype.releaseAll = function (type) {
        var _this = this;
        this.pools[type].currentObjects.forEach(function (obj, index) {
            if (obj !== undefined) {
                _this.releaseById(type, index);
            }
        });
        return this;
    };
    PoolManager.prototype.releaseAllPools = function () {
        var _this = this;
        Object.keys(this.pools).forEach(function (poolType) {
            _this.releaseAll(poolType);
        });
        return this;
    };
    PoolManager.prototype.getById = function (type, id) {
        return this.pools[type].currentObjects[id];
    };
    PoolManager.prototype.isPoolExist = function (type) {
        return this.pools[type] !== undefined;
    };
    PoolManager.prototype.getPool = function (type) {
        return this.pools[type];
    };
    PoolManager.prototype.currentSize = function (type) {
        var currentPool = this.pools[type];
        return currentPool.currentObjects.length - currentPool.freeIndexes.length;
    };
    PoolManager.prototype.freeIdSize = function (type) {
        return this.pools[type].freeIndexes.length;
    };
    PoolManager.prototype.freeObjectSize = function (type) {
        return this.pools[type].freeList.length;
    };
    PoolManager.prototype.getSafeCurrents = function (type) {
        return this.pools[type].currentObjects.filter(function (obj) { return obj !== undefined; });
    };
    return PoolManager;
}());
export { PoolManager };
//# sourceMappingURL=../../src/src/pool/pool.js.map