import type { IProduct } from '../model/types';
import React from 'react';
import { ProductLabel } from './productLabel/ProductLabel';
import { StyledListItem } from '@shared/ui/styledListItem';

interface IProductProps {
    product: IProduct;
    updateAction?: React.ReactNode;
    deleteAction?: React.ReactNode;
    toggleAction?: React.ReactNode;
}

export const Product: React.FunctionComponent<IProductProps> = ({
    product,
    updateAction,
    deleteAction,
    toggleAction,
}) => {
    const readyTexField = updateAction ? (
        updateAction
    ) : (
        <ProductLabel product={product} />
    );

    console.log('rerender', product.label);
    return (
        <StyledListItem>
            {toggleAction}
            {readyTexField}
            {deleteAction}
        </StyledListItem>
    );
};
