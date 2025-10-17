import React from 'react';
import { BaseInteractionProduct } from './BaseInteractionProduct';
import { useSelectFromProducts } from '../model/useSelectFromProducts';
import type { IProductElementProps } from '../model/types';

export const MemoCheckedProduct: React.FunctionComponent<IProductElementProps> =
    React.memo(({ id }) => {
        const { product } = useSelectFromProducts(id);
        if (!product) {
            return null;
        }
        return <BaseInteractionProduct product={product} />;
    });
