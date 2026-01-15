import { type IProduct } from '@entities/product';
import { CreateProduct } from '@features/createProduct';
import { Divider, Paper, Typography } from '@mui/material';
import React from 'react';
import { MemoCheckedProduct } from './MemoCheckedProduct';
import { MemoUncheckedProduct } from './MemoUncheckedProduct';
import { reverseMap } from '@shared/lib/restUtils';
import { useTriggerContext } from '../lib/triggerContext';

interface IProductsListProps {
    checked: IProduct[];
    unchecked: IProduct[];
}

export const ProductsList: React.FunctionComponent<IProductsListProps> =
    React.memo(({ checked, unchecked }) => {
        const { triggerError } = useTriggerContext();
        return (
            <Paper
                elevation={2}
                sx={{
                    overflowY: 'auto',
                    flexGrow: 1,
                    borderRadius: 3,
                }}
            >
                <CreateProduct triggerError={triggerError} />
                <ul>
                    {checked.length || unchecked.length ? (
                        <>
                            {reverseMap(unchecked, product => (
                                <MemoUncheckedProduct
                                    key={product.id}
                                    id={product.id}
                                />
                            ))}
                            <Divider
                                sx={{
                                    marginBlock: 2,
                                    borderBottomWidth: 2,
                                    display:
                                        checked.length && unchecked.length
                                            ? 'block'
                                            : 'none',
                                }}
                                variant="middle"
                            />
                            {checked.map(product => (
                                <MemoCheckedProduct
                                    key={product.id}
                                    id={product.id}
                                />
                            ))}
                        </>
                    ) : (
                        <Typography
                            color="text.secondary"
                            align="center"
                            sx={{ py: 4, fontStyle: 'italic' }}
                        >
                            Ничего не найдено
                        </Typography>
                    )}
                </ul>
            </Paper>
        );
    });
