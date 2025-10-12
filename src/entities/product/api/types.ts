import type { IProduct } from '../model/types';

export type productStorage = Record<number, IProduct>;
export type productOrder = IProduct[];
export type normalize = { order: productOrder; products: productStorage };

export interface OptimisticUpdateOptions<T> {
    patchResult: { undo: () => void };
    queryFulfilled: T;
    dispatch?: AppDispatch;
    action?: Parameters<AppDispatch>[0];
}
