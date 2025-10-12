import { Product, type IProductProps } from '@entities/product';
import { DeleteProduct } from '@features/deleteProduct';
import { ToggleProduct } from '@features/toggleProduct';
import React from 'react';

interface IBaseInteractionProductProps extends IProductProps {
    triggerError?: (arg: string) => void;
    triggerConfirm?: (arg1: () => Promise<void>, arg2: string) => void;
}

export const BaseInteractionProduct: React.FunctionComponent<IBaseInteractionProductProps> =
    React.memo(({ product, triggerConfirm, triggerError, ...restProps }) => {
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
                    ...restProps,
                }}
            />
        );
    });
