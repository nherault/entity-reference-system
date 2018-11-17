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
export declare class PoolManager {
    private pools;
    constructor();
    addPool(poolId: string, initialSize: number, reference: any, expandMinUnits?: number, expandFactor?: number): Pool;
    expandPool(poolId: string, nbToExpand: number): PoolManager;
    createAndGenerateId(type: string): any;
    getCurrents(type: string): any[];
    release(type: string, pooledObject: PooledObject): PoolManager;
    releaseById(type: string, id: number): PoolManager;
    releaseAll(type: string): PoolManager;
    releaseAllPools(): PoolManager;
    getById(type: string, id: number): any;
    isPoolExist(type: string): boolean;
    getPool(type: string): Pool;
    currentSize(type: string): number;
    freeIdSize(type: string): number;
    freeObjectSize(type: string): number;
    getSafeCurrents(type: string): any[];
}
