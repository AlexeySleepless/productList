import { productsApi } from '../api/api';
import type { IProduct } from '../model/types';

export const useProductMutation = <T extends keyof IProduct>(
    product: IProduct,
    key: T,
    triggerError?: (arg: string) => void,
    message?: string,
) => {
    const [updateFn] = productsApi.useUpdateProductMutation();
    const applyNewValue = (value: IProduct[T]) => {
        const updatePromise = updateFn({ ...product, [key]: value }).unwrap();
        if (!triggerError) {
            return;
        }
        updatePromise.catch(() => {
            triggerError(message || '');
        });
    };
    return applyNewValue;
};
