import { createSelector } from '@reduxjs/toolkit';
import { productsApi } from './api';

export const selectProductsResult =
    productsApi.endpoints.fetchAllProducts.select('');

export const selectUniqueProductTypes = createSelector(
    selectProductsResult,
    result => {
        const data = result.data;
        console.log('selector', result);
        if (!data) {
            return [];
        }
        const products = data.order;
        const uniqTypesSet = new Set(products.map(product => product.type));
        return [...uniqTypesSet].sort();
    },
);
