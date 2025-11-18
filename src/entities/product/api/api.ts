import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IProduct } from '../model/types';
import type { normalize, productOrder, productStorage } from './types';
import {
    createProduct,
    deleteProduct,
    getProducts,
    getProductTypes,
    updateProduct,
} from './storageInteraction';
import { handleOptimisticUpdate } from './utils';

const productsTag = 'products';
const productTypesTag = 'types';
const tagTypes = [productsTag];

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fakeBaseQuery(),
    tagTypes,
    endpoints: build => ({
        // запрос всех продуктов
        fetchAllProducts: build.query<normalize, unknown>({
            queryFn: async () => {
                try {
                    const products = await getProducts();
                    const productStorage: productStorage = {};
                    const order: productOrder = [];
                    products.forEach(product => {
                        const { id } = product;
                        productStorage[id] = product;
                        order.push(product);
                    });
                    const data = { order, products: productStorage };
                    return { data };
                } catch (error) {
                    return { error };
                }
            },
            providesTags: () => [productsTag],
        }),

        // запрос всех типов продуктов
        fetchAllProductTypes: build.query<string[], unknown>({
            queryFn: async () => {
                try {
                    const data = await getProductTypes();
                    return { data };
                } catch (error) {
                    return { error };
                }
            },
            providesTags: () => [productTypesTag],
        }),

        // обновление продукта
        updateProduct: build.mutation<unknown, IProduct>({
            queryFn: async (product: IProduct) => {
                try {
                    await updateProduct(product);
                    return { data: '' };
                } catch {
                    return { error: { message: 'Редактирование не удалось' } };
                }
            },
            async onQueryStarted(
                product: IProduct,
                { dispatch, queryFulfilled },
            ) {
                const patchResult = dispatch(
                    productsApi.util.updateQueryData(
                        'fetchAllProducts',
                        '',
                        draft => {
                            Object.assign(
                                draft.products?.[product.id],
                                product,
                            );

                            const index = draft.order.findIndex(
                                item => item.id == product.id,
                            );
                            if (index > -1) {
                                Object.assign(draft.order[index], product);
                            }
                        },
                    ),
                );
                const action = productsApi.util.invalidateTags([productsTag]);
                handleOptimisticUpdate({
                    patchResult,
                    queryFulfilled,
                    dispatch,
                    action,
                });
            },
            invalidatesTags: [productTypesTag],
        }),

        // удаление продукта
        deleteProduct: build.mutation<unknown, number>({
            queryFn: async (id: number) => {
                try {
                    await deleteProduct(id);
                    return { data: '' };
                } catch {
                    return { error: { message: 'Удаление не удалось' } };
                }
            },
            async onQueryStarted(id: number, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    productsApi.util.updateQueryData(
                        'fetchAllProducts',
                        '',
                        draft => {
                            delete draft.products[id];
                            const order = draft.order;
                            for (let i = 0; i < order.length; i++) {
                                if (order[i].id === id) {
                                    order.splice(i, 1);
                                }
                            }
                        },
                    ),
                );
                const action = productsApi.util.invalidateTags([productsTag]);
                handleOptimisticUpdate({
                    patchResult,
                    queryFulfilled,
                    dispatch,
                    action,
                });
            },
            invalidatesTags: [productTypesTag],
        }),

        // создание продукта
        createProduct: build.mutation<unknown, IProduct>({
            queryFn: async (data: IProduct) => {
                try {
                    await createProduct(data);
                    return { data: '' };
                } catch {
                    return { error: { message: 'Создание не удалось' } };
                }
            },
            async onQueryStarted(
                product: IProduct,
                { dispatch, queryFulfilled },
            ) {
                const patchResult = dispatch(
                    productsApi.util.updateQueryData(
                        'fetchAllProducts',
                        '',
                        draft => {
                            draft.products[product.id] = product;
                            draft.order.push(product);
                        },
                    ),
                );
                const action = productsApi.util.invalidateTags([productsTag]);
                handleOptimisticUpdate({
                    patchResult,
                    queryFulfilled,
                    dispatch,
                    action,
                });
            },
            invalidatesTags: [productTypesTag],
        }),
    }),
});
