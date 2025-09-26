import { Product, ProductLabel, type IProduct } from '@entities/product';
import { DeleteProduct } from '@features/deleteProduct';
import { UpdateWrapper } from '@features/updateProduct';
import { Divider, Paper, Stack, Typography } from '@mui/material';
import React from 'react';

interface IProductsListProps {
    checked: IProduct[];
    unchecked: IProduct[];
    triggerError?: (arg: string) => void;
    triggerConfirm?: (arg1: () => Promise<void>, arg2: string) => void;
}

export const ProductsList: React.FunctionComponent<IProductsListProps> =
    React.memo(({ checked, unchecked, triggerConfirm, triggerError }) => {
        return (
            <Paper
                elevation={2}
                sx={{
                    overflowY: 'auto',
                    flexGrow: 1,
                    borderRadius: 3,
                }}
            >
                <Stack sx={{ padding: 0 }}>
                    {checked.length || unchecked.length ? (
                        <>
                            {unchecked.map(product => {
                                console.log(product.label);
                                const updateAction = (
                                    <UpdateWrapper
                                        product={product}
                                        onError={triggerError}
                                    >
                                        <ProductLabel product={product} />
                                    </UpdateWrapper>
                                );
                                const deleteAction = (
                                    <DeleteProduct
                                        triggerConfirm={triggerConfirm}
                                        triggerError={triggerError}
                                        product={product}
                                    />
                                );
                                return (
                                    <Product
                                        key={product.id}
                                        {...{ product }}
                                        updateAction={updateAction}
                                        deleteAction={deleteAction}
                                    />
                                );
                            })}
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
                                <Product key={product.id} {...{ product }} />
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
                </Stack>
            </Paper>
        );
    });
