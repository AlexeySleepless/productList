import { alpha, ListItem, useTheme } from '@mui/material';
import type { IProduct } from '../model/types';
import React from 'react';
import { ProductLabel } from './productLabel/ProductLabel';

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
    const theme = useTheme();

    const readyTexField = updateAction ? (
        updateAction
    ) : (
        <ProductLabel product={product} />
    );

    return (
        <ListItem
            disablePadding
            sx={{
                padding: '5px',
                alignItems: 'stretch',
                '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.15),
                },
                '@media (pointer: coarse)': {
                    '&:hover': {
                        backgroundColor: 'transparent',
                    },
                    '&:focus-visible': {
                        backgroundColor: 'transparent',
                    },
                },
            }}
        >
            {toggleAction}

            {readyTexField}

            {deleteAction}
        </ListItem>
    );
};
