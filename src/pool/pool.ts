const initialPool: Pool = {
    currentObjects: [],
    expandFactor: 0.2,
    expandMinUnits: 32,
    freeIndexes: [],
    freeList: [],
    id: '',
    reference: {},
};

export interface PooledObject {
    id: number;
    [props: string]: any;
}

export interface Pool {
    id: string;
    freeList: any[];
    freeIndexes: number[];
    currentObjects: Array<PooledObject | undefined>;
    expandMinUnits: number;
    expandFactor: number;
    reference: any;
}

export interface Pools {
    [key: string]: Pool;
}

export class PoolManager {

    private pools: Pools;

    constructor() {
        this.pools = {};
    }

    public addPool(poolId: string, initialSize: number, reference: any, expandMinUnits = 32, expandFactor = 0.2): Pool {
        this.pools[poolId] = JSON.parse(JSON.stringify(initialPool));
        this.pools[poolId].expandMinUnits = expandMinUnits;
        this.pools[poolId].expandFactor = expandFactor;
        this.pools[poolId].reference = reference;
        this.pools[poolId].id = poolId;
        this.expandPool(poolId, initialSize);
        return this.pools[poolId];
    }

    public expandPool(poolId: string, nbToExpand: number): PoolManager {
        const pool = this.pools[poolId];
        for (let i = 0; i < nbToExpand; i++) {
            pool.freeList.push(JSON.parse(JSON.stringify(pool.reference)));
        }
        return this;
    }

    public createAndGenerateId(type: string): any {

        // Create more if the free list is empty
        const currentPool = this.pools[type];
        if (currentPool.freeList.length <= 0) {

            let growth = Math.ceil(currentPool.freeList.length * currentPool.expandFactor);

            if (growth < currentPool.expandMinUnits) {
                growth = currentPool.expandMinUnits;
            }

            this.expandPool(type, growth);
        }

        // Get a new object.
        const newObject = currentPool.freeList.pop();

        // Get a free id
        let objectId = currentPool.freeIndexes.pop();
        if (objectId === undefined) {
            objectId = currentPool.currentObjects.length;
        }

        // Set the id and the object to the pool
        newObject.id = objectId;
        currentPool.currentObjects[objectId] = newObject;

        return newObject;
    }

    public getCurrents(type: string): any[] {
        return this.pools[type].currentObjects;
    }

    public release(type: string, pooledObject: PooledObject): PoolManager {
        return this.releaseById(type, pooledObject.id);
    }

    public releaseById(type: string, id: number): PoolManager {
        const currentPool = this.pools[type];
        const obj = currentPool.currentObjects[id];
        if (obj && obj.id !== undefined) {
            // Add the object to the free list
            currentPool.freeList.push(obj);

            // Add the id to the freeIndexes
            currentPool.freeIndexes.push(obj.id);

            // Delete in the object list
            currentPool.currentObjects[obj.id] = undefined;
        }
        return this;
    }

    public releaseAll(type: string): PoolManager {
        this.pools[type].currentObjects.forEach((obj, index) => {
            if (obj !== undefined) {
                this.releaseById(type, index);
            }
        });
        return this;
    }

    public releaseAllPools(): PoolManager {
        Object.keys(this.pools).forEach((poolType) => {
            this.releaseAll(poolType);
        });
        return this;
    }

    public getById(type: string, id: number): any {
        return this.pools[type].currentObjects[id];
    }

    public isPoolExist(type: string): boolean {
        return this.pools[type] !== undefined;
    }

    public getPool(type: string): Pool {
        return this.pools[type];
    }

    public currentSize(type: string): number {
        const currentPool = this.pools[type];
        return currentPool.currentObjects.length - currentPool.freeIndexes.length;
    }

    public freeIdSize(type: string): number {
        return this.pools[type].freeIndexes.length;
    }

    public freeObjectSize(type: string): number {
        return this.pools[type].freeList.length;
    }

    public getSafeCurrents(type: string): any[] {
        return this.pools[type].currentObjects.filter((obj) => obj !== undefined);
    }
}
