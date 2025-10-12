import React from 'react';
import { BaseInteractionProduct } from './BaseInteractionProduct';
import { useSelectFromProducts } from '../model/useSelectFromProducts';

interface IMemoCheckedProductProps {
    id: number;
    triggerError?: (arg: string) => void;
    triggerConfirm?: (arg1: () => Promise<void>, arg2: string) => void;
}

export const MemoCheckedProduct: React.FunctionComponent<IMemoCheckedProductProps> =
    React.memo(({ id, triggerConfirm, triggerError }) => {
        const { product } = useSelectFromProducts(id);
        if (!product) {
            return null;
        }
        return (
            <BaseInteractionProduct
                {...{
                    product,
                    triggerConfirm,
                    triggerError,
                }}
            />
        );
    });
