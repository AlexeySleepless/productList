import { Product, type IProduct } from '@entities/product';
import { DeleteProduct } from '@features/deleteProduct';
import { ToggleProduct } from '@features/toggleProduct';
import React from 'react';

interface IMemoCheckedProductProps {
    product: IProduct;
    triggerError?: (arg: string) => void;
    triggerConfirm?: (arg1: () => Promise<void>, arg2: string) => void;
}

export const MemoCheckedProduct: React.FunctionComponent<IMemoCheckedProductProps> =
    React.memo(({ product, triggerConfirm, triggerError }) => {
        const deleteAction = (
            <DeleteProduct
                triggerConfirm={triggerConfirm}
                triggerError={triggerError}
                product={product}
            />
        );

        const toggleAction = (
            <ToggleProduct triggerError={triggerError} product={product} />
        );
        return (
            <Product
                {...{
                    product,
                    deleteAction,
                    toggleAction,
                }}
            />
        );
    });
