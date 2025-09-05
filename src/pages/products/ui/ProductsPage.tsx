import React, { useMemo, useState } from 'react';
import {
    Box,
    Typography,
    //useMediaQuery,
    useTheme,
    Paper,
    Stack,
    Divider,
} from '@mui/material';
import { ProductsFilters, type IFilters } from '@features/productsFilter';
import { sorts } from '@features/productsFilter/model/types';
import {
    Product,
    ProductLabel,
    productsApi,
    type IProduct,
} from '@entities/product';
import { UpdateWrapper } from '@features/updateProduct';

export const ProductsPage: React.FunctionComponent = () => {
    const [filters, setFilters] = useState<IFilters>({
        searchQuery: '',
        sortType: sorts.NONE,
    });

    //const [items, setItems] = useState<IProduct[]>(itemsData);

    // const { products, isLoading, error } = useAppSelector(
    //     state => state.productsReducer,
    // );

    const { data: products = [] } = productsApi.useFetchAllProductsQuery('', {
        selectFromResult: ({ data }) => ({ data }),
    });

    const theme = useTheme();
    //const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // const handleToggle = (id: number) => {
    //     const newItems = items.map(item =>
    //         item.id === id
    //             ? {
    //                   ...item,
    //                   isChecked: !item.isChecked,
    //               }
    //             : item,
    //     );
    //     setItems(newItems);
    // };

    // const editLabel = (id: number, label: string) => {
    //     const newItems = items.map(item =>
    //         item.id === id
    //             ? {
    //                   ...item,
    //                   label,
    //               }
    //             : item,
    //     );
    //     setItems(newItems);
    // };

    const [checked, uncheked] = useMemo<[IProduct[], IProduct[]]>(() => {
        const checked: IProduct[] = [];
        const uncheked: IProduct[] = [];

        products.forEach(product => {
            const lowerLabel = product.label.toLowerCase();
            const lowerQuery = filters.searchQuery.toLowerCase();
            if (!lowerLabel.includes(lowerQuery)) {
                return;
            }
            if (product.isChecked) {
                checked.push(product);
            } else {
                uncheked.push(product);
            }
        });
        return [checked, uncheked];
    }, [products, filters.searchQuery]);

    return (
        <Box
            sx={{
                maxWidth: 500,
                margin: '0px auto',
                p: 2,
                bgcolor: 'transparent',
                backgroundColor: 'transparent',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
        >
            <ProductsFilters {...{ filters, setFilters }} />

            <Paper
                elevation={2}
                sx={{
                    overflowY: 'auto',
                    flexGrow: 1,
                    borderRadius: 3,
                    bgcolor: theme.palette.background.default,
                }}
            >
                <Stack sx={{ padding: 0 }}>
                    {checked.length || uncheked.length ? (
                        <>
                            {uncheked.map(product => {
                                const updateAction = (
                                    <UpdateWrapper product={product}>
                                        <ProductLabel product={product} />
                                    </UpdateWrapper>
                                );
                                return (
                                    <Product
                                        key={product.id}
                                        {...{ product }}
                                        updateAction={updateAction}
                                    />
                                );
                            })}
                            <Divider
                                sx={{
                                    marginBlock: 2,
                                    borderBottomWidth: 2,
                                    display:
                                        checked.length && uncheked.length
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
        </Box>
    );
};
