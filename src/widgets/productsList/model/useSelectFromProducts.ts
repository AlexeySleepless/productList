import { productsApi } from '@entities/product';

export const useSelectFromProducts = (id: number) => {
    const data = productsApi.useFetchAllProductsQuery('', {
        selectFromResult: ({ data }) => ({
            product: data?.products?.[id],
        }),
    });
    return data;
};
