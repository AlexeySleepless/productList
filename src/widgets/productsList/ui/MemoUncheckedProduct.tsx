import { ProductLabel } from '@entities/product';
import { UpdateWrapper } from '@features/updateProduct';
import React from 'react';
import { BaseInteractionProduct } from './BaseInteractionProduct';
import { useSelectFromProducts } from '../model/useSelectFromProducts';
import type { IProductElementProps } from '../model/types';
import { useTriggerContext } from '../lib/triggerContext';
import { UpdateProductType } from '@features/updateProductType';
import { Box } from '@mui/material';
import { UpdateProductImportant } from '@features/updateProductImportant';
import { UpdateProductFavorite } from '@features/updateProductFavorite';

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
                    padding: '5px 5px 15px',
                    display: 'flex',
                    gap: '10px',
                }}
            >
                <UpdateProductImportant
                    triggerError={triggerError}
                    product={product}
                />
                <UpdateProductFavorite
                    triggerError={triggerError}
                    product={product}
                />
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
