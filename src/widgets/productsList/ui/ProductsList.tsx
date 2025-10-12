import { type IProduct } from '@entities/product';
import { CreateProduct } from '@features/createProduct';
import { Divider, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { MemoCheckedProduct } from './MemoCheckedProduct';
import { MemoUncheckedProduct } from './MemoUncheckedProduct';

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
                            {reverseMap(unchecked, product => (
                                <MemoUncheckedProduct
                                    key={product.id}
                                    id={product.id}
                                    triggerConfirm={triggerConfirm}
                                    triggerError={triggerError}
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
                                    triggerConfirm={triggerConfirm}
                                    triggerError={triggerError}
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
                </Stack>
            </Paper>
        );
    });
