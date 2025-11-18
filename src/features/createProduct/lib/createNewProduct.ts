import type { IProduct } from '@entities/product';
import type { TNewProduct } from '../model/types';

export const createNewProduct = (data: TNewProduct): IProduct => {
    const id = Date.now();
    return {
        id,
        isChecked: false,
        ...data,
    };
};
