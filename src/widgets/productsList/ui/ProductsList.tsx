import { Product, ProductLabel, type IProduct } from '@entities/product';
import { CreateProduct } from '@features/createProduct';
import { DeleteProduct } from '@features/deleteProduct';
import { ToggleProduct } from '@features/toggleProduct';
import { UpdateWrapper } from '@features/updateProduct';
import { Divider, Paper, Stack, Typography } from '@mui/material';
import React from 'react';

interface IProductsListProps {
    checked: IProduct[];
    unchecked: IProduct[];
    triggerError?: (arg: string) => void;
    triggerConfirm?: (arg1: () => Promise<void>, arg2: string) => void;
}

function reverseMap<Input, Output>(
    arr: Input[],
    callback: (value: Input, index: number, array: Input[]) => Output,
): Output[] {
    const result: Output[] = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        const value: Output = callback(arr[i], i, arr);
        result.push(value);
    }
    return result;
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
                    <CreateProduct triggerError={triggerError} />
                    {checked.length || unchecked.length ? (
                        <>
                            {reverseMap(unchecked, product => {
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

                                const toggleAction = (
                                    <ToggleProduct
                                        triggerError={triggerError}
                                        product={product}
                                    />
                                );
                                return (
                                    <Product
                                        key={product.id}
                                        {...{
                                            product,
                                            updateAction,
                                            deleteAction,
                                            toggleAction,
                                        }}
                                    />
                                );
                            })}
                            {/* {unchecked.map(product => {
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

                                const toggleAction = (
                                    <ToggleProduct
                                        triggerError={triggerError}
                                        product={product}
                                    />
                                );
                                return (
                                    <Product
                                        key={product.id}
                                        {...{
                                            product,
                                            updateAction,
                                            deleteAction,
                                            toggleAction,
                                        }}
                                    />
                                );
                            })} */}
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
                            {checked.map(product => {
                                const toggleAction = (
                                    <ToggleProduct
                                        triggerError={triggerError}
                                        product={product}
                                    />
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
                                        {...{
                                            product,
                                            toggleAction,
                                            deleteAction,
                                        }}
                                    />
                                );
                            })}
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
