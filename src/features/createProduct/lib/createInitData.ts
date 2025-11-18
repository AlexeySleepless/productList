import type { TNewProduct } from '../model/types';

export const createInitData = (): TNewProduct => {
    return {
        label: '',
        important: false,
        type: '',
    };
};
