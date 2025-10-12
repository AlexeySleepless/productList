import type { IProductProps } from '../model/types';
import React from 'react';
import { ProductLabel } from './productLabel/ProductLabel';
import { StyledListItem } from '@shared/ui/styledListItem';

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
