import type { IProduct } from '@entities/product';

export type TNewProduct = Pick<IProduct, 'label' | 'important' | 'type'>;
