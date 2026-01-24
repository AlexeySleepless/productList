import type { IProduct } from '@entities/product';

const searchFunc = (product: IProduct, searchQuery: string): boolean => {
    const lowerLabel = product.label.toLowerCase();
    const lowerQuery = searchQuery.toLowerCase();
    return lowerLabel.includes(lowerQuery);
};

export const getPresetSearchFunc = (searchQuery: string) => {
    return (product: IProduct) => {
        return searchFunc(product, searchQuery);
    };
};
