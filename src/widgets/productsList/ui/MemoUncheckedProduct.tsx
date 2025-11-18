import { ProductLabel } from '@entities/product';
import { UpdateWrapper } from '@features/updateProduct';
import React from 'react';
import { BaseInteractionProduct } from './BaseInteractionProduct';
import { useSelectFromProducts } from '../model/useSelectFromProducts';
import type { IProductElementProps } from '../model/types';
import { useTriggerContext } from '../lib/triggerContext';
import { UpdateProductType } from '@features/updateProductType';
import { Box } from '@mui/material';

export const MemoUncheckedProduct: React.FunctionComponent<IProductElementProps> =
    React.memo(({ id }) => {
        const { triggerError } = useTriggerContext();
        const { product } = useSelectFromProducts(id);
        if (!product) {
            return null;
        }
        const updateAction = (
            <UpdateWrapper product={product} onError={triggerError}>
                <ProductLabel product={product} />
            </UpdateWrapper>
        );

        const infoUI = (
            <Box
                sx={{
                    padding: '10px 5px',
                }}
            >
                <UpdateProductType
                    triggerError={triggerError}
                    product={product}
                />
            </Box>
        );

        return (
            <BaseInteractionProduct
                {...{
                    product,
                    updateAction,
                    infoUI,
                }}
            />
        );
    });
