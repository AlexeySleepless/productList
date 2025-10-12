import { ProductLabel } from '@entities/product';
import { UpdateWrapper } from '@features/updateProduct';
import React from 'react';
import { BaseInteractionProduct } from './BaseInteractionProduct';
import { useSelectFromProducts } from '../model/useSelectFromProducts';

interface IMemoUncheckedProductProps {
    id: number;
    triggerError?: (arg: string) => void;
    triggerConfirm?: (arg1: () => Promise<void>, arg2: string) => void;
}

export const MemoUncheckedProduct: React.FunctionComponent<IMemoUncheckedProductProps> =
    React.memo(({ id, triggerConfirm, triggerError }) => {
        const { product } = useSelectFromProducts(id);
        if (!product) {
            return null;
        }
        const updateAction = (
            <UpdateWrapper product={product} onError={triggerError}>
                <ProductLabel product={product} />
            </UpdateWrapper>
        );

        return (
            <BaseInteractionProduct
                {...{
                    product,
                    updateAction,
                    triggerConfirm,
                    triggerError,
                }}
            />
        );
    });
