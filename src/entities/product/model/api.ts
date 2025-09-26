import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IProduct } from './types';

const products: IProduct[] = [
    { id: 1, label: 'Молоко', isChecked: false },
    { id: 2, label: 'Сахар', isChecked: false },
    { id: 3, label: 'Бананы', isChecked: false },
    { id: 4, label: 'Йогурт', isChecked: false },
    // { id: 5, label: 'Пуддинг', isChecked: false },
    // { id: 6, label: 'Яблоко', isChecked: false },
    // { id: 7, label: 'Хлеб', isChecked: false },
    // { id: 8, label: 'Молоко', isChecked: false },
    // { id: 9, label: 'Сыр', isChecked: false },
    // { id: 10, label: 'Банан', isChecked: false },
    // { id: 11, label: 'Яйцо', isChecked: false },
    // { id: 12, label: 'Картофель', isChecked: false },
    // { id: 13, label: 'Морковь', isChecked: false },
    // { id: 14, label: 'Курица', isChecked: false },
    // { id: 15, label: 'Огурец', isChecked: false },
    // { id: 16, label: 'Сметана', isChecked: false },
    // { id: 17, label: 'Кефир', isChecked: false },
    // { id: 18, label: 'Гречка', isChecked: false },
    // { id: 19, label: 'Сахар', isChecked: false },
    // { id: 20, label: 'Томат', isChecked: false },
];

async function getProducts(): Promise<IProduct[]> {
    await new Promise<void>(res => {
        setTimeout(() => {
            res();
        }, 1000);
    });
    return [...products];
}

async function updateProduct(data: IProduct): Promise<void> {
    await new Promise<void>(res => {
        setTimeout(() => {
            res();
        }, 2000);
    });
    if (Math.random() < 5) {
        throw new Error('не удалось отрелактировать');
    }
    const needIndex = products.findIndex(product => product.id === data.id);
    if (needIndex > -1) {
        products[needIndex] = data;
    }
}

async function deleteProduct(id: number): Promise<void> {
    await new Promise<void>(res => {
        setTimeout(() => {
            res();
        }, 2000);
    });
    if (Math.random() < 5) {
        throw new Error('не удалось удалить');
    }
    const needIndex = products.findIndex(product => product.id === id);
    if (needIndex > -1) {
        products.splice(needIndex, 1);
    }
}

const productsTag = 'products';
export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: [productsTag],
    endpoints: build => ({
        fetchAllProducts: build.query<IProduct[], unknown>({
            queryFn: async () => {
                try {
                    const products = await getProducts();
                    return { data: products };
                } catch (error) {
                    return { error };
                }
            },
            providesTags: () => [productsTag],
        }),
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
                // dispatch(
                //     productsApi.endpoints.fetchAllProducts.initiate('', {
                //         subscriptionOptions: {
                //             pollingInterval: 0,
                //         },
                //     }),
                // );
                const patchResult = dispatch(
                    productsApi.util.updateQueryData(
                        'fetchAllProducts',
                        '',
                        draft => {
                            const index = draft.findIndex(
                                item => item.id == product.id,
                            );
                            if (index > -1) {
                                Object.assign(draft[index], product);
                            }
                        },
                    ),
                );
                try {
                    console.log('ждем');
                    await queryFulfilled;
                } catch {
                    console.log('откат');
                    patchResult.undo();
                }
            },
            invalidatesTags: [productsTag],
        }),
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
                            const index = draft.findIndex(
                                item => item.id == id,
                            );
                            if (index > -1) {
                                draft.splice(index, 1);
                            }
                        },
                    ),
                );
                try {
                    console.log('ждем');
                    await queryFulfilled;
                } catch {
                    console.log('откат');
                    patchResult.undo();
                }
            },
            invalidatesTags: [productsTag],
        }),
    }),
});
