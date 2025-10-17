import { Product, type IProductProps } from '@entities/product';
import { DeleteProduct } from '@features/deleteProduct';
import { ToggleProduct } from '@features/toggleProduct';
import React from 'react';
import { useTriggerContext } from '../lib/triggerContext';

export const BaseInteractionProduct: React.FunctionComponent<IProductProps> = ({
    product,
    ...restProps
}) => {
    const { triggerConfirm, triggerError } = useTriggerContext();
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
};
