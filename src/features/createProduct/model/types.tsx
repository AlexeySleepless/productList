import type { IProduct } from '@entities/product';

export type TNewProduct = Omit<IProduct, 'id' | 'isChecked'>;
