import type { IProduct } from '@entities/product';

export const checkedSplit = (
    order: IProduct[],
    searchFn: (arg: IProduct) => boolean,
): [IProduct[], IProduct[]] => {
    const checked: IProduct[] = [];
    const uncheked: IProduct[] = [];

    order.forEach(product => {
        if (!searchFn(product)) {
            return;
        }
        if (product.isChecked) {
            checked.push(product);
        } else {
            uncheked.push(product);
        }
    });

    return [checked, uncheked];
};
