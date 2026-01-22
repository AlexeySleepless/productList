import {
    ProductFavorite,
    ProductImportance,
    productsApi,
    ProductTypeAutocomplete,
} from '@entities/product';
import { Box, Button, Drawer, TextField } from '@mui/material';
import type React from 'react';
import { useRef, useState } from 'react';
import type { TNewProduct } from '../model/types';
import { createInitData } from '../lib/createInitData';
import { createNewProduct } from '../lib/createNewProduct';
import { CreateProductInList } from './CreateProductInList';

interface IСreateProductProps {
    triggerError?: (arg: string) => void;
}

export const CreateProduct: React.FunctionComponent<IСreateProductProps> = ({
    triggerError,
}) => {
    const label = 'Добавить продукт';
    const [data, setData] = useState<TNewProduct>(createInitData);
    const [open, setOpen] = useState<boolean>(false);
    const [createFn] = productsApi.useCreateProductMutation();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const createProduct = () => {
        const newProduct = createNewProduct(data);
        createFn(newProduct)
            .unwrap()
            .catch(() => {
                triggerError?.('Не удалось создать продукт');
            });
    };

    const addProduct = () => {
        createProduct();
        setData(createInitData());
        setOpen(false);
    };

    const showDrawer = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
        event.preventDefault();
        setOpen(true);
        setTimeout(() => {
            inputRef.current?.focus();
        }, 200);
    };
    return (
        <>
            <CreateProductInList onClick={showDrawer} label={label} />
            <Drawer
                open={open}
                anchor="bottom"
                onClose={() => {
                    //сбрасываем введенные данные
                    setData(createInitData());
                    setOpen(false);
                }}
                sx={{
                    '& .MuiDrawer-paper': {
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    },
                }}
            >
                <TextField
                    defaultValue={data.label}
                    inputRef={inputRef}
                    label="Название продукта"
                    variant="outlined"
                    //с управляемым компонентом не задалось
                    onBlur={() => {
                        setData(data => ({
                            ...data,
                            label: inputRef.current?.value ?? '',
                        }));
                    }}
                />
                <ProductTypeAutocomplete
                    productType={data.type}
                    applyNewType={(type: string) => {
                        setData(data => ({
                            ...data,
                            type,
                        }));
                    }}
                />

                <Box
                    sx={{
                        display: 'flex',
                        gap: '10px',
                        flexWrap: 'wrap',
                    }}
                >
                    <ProductImportance
                        productImprotance={data.important}
                        applyNewImportance={(value: boolean) => {
                            setData(data => ({
                                ...data,
                                important: value,
                            }));
                        }}
                    />
                    <ProductFavorite
                        productFavorite={data.favorite}
                        applyNewFavorite={(value: boolean) => {
                            setData(data => ({
                                ...data,
                                favorite: value,
                            }));
                        }}
                    />
                </Box>

                <Button
                    variant="outlined"
                    onClick={() => {
                        addProduct();
                    }}
                >
                    {label}
                </Button>
            </Drawer>
        </>
    );
};
