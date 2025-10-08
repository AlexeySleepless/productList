import { Product, ProductLabel, type IProduct } from '@entities/product';
import { DeleteProduct } from '@features/deleteProduct';
import { ToggleProduct } from '@features/toggleProduct';
import { UpdateWrapper } from '@features/updateProduct';
import React from 'react';

interface IMemoUncheckedProductProps {
    product: IProduct;
    triggerError?: (arg: string) => void;
    triggerConfirm?: (arg1: () => Promise<void>, arg2: string) => void;
}

export const MemoUncheckedProduct: React.FunctionComponent<IMemoUncheckedProductProps> =
    React.memo(({ product, triggerConfirm, triggerError }) => {
        const updateAction = (
            <UpdateWrapper product={product} onError={triggerError}>
                <ProductLabel product={product} />
            </UpdateWrapper>
        );
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
                    updateAction,
                    deleteAction,
                    toggleAction,
                }}
            />
        );
    });
