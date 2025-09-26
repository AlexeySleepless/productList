import React, { useCallback, useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { ProductsFilters, type IFilters } from '@features/productsFilter';
import { sorts } from '@features/productsFilter/model/types';
import { productsApi, type IProduct } from '@entities/product';
import { useLastError, useManageModal } from '@shared/lib/uiUtils';
import { ErrorAlert } from '@shared/ui/errorAlert';
import { ConfirmModal } from '@shared/ui/confirmModal';
import { ProductsList } from '@widgets/productsList';

export const ProductsPage: React.FunctionComponent = () => {
    const [filters, setFilters] = useState<IFilters>({
        searchQuery: '',
        sortType: sorts.NONE,
    });

    const { data: products = [] } = productsApi.useFetchAllProductsQuery('', {
        selectFromResult: ({ data }) => ({ data }),
    });

    const { openFlag, errorMessage, closeError, triggerError } = useLastError();

    const { open, message, triggerConfirm, confirmAction, closeConfirm } =
        useManageModal();

    const memoTriggerConfirm = useCallback(triggerConfirm, []);
    const memoTriggerError = useCallback(triggerError, []);

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

    const [checked, unchecked] = useMemo<[IProduct[], IProduct[]]>(() => {
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
            <ErrorAlert
                open={openFlag}
                message={errorMessage}
                onClose={closeError}
            />
            <ConfirmModal
                open={open}
                closeDialog={closeConfirm}
                executeFn={confirmAction}
                message={message}
            />
            <ProductsFilters {...{ filters, setFilters }} />
            <ProductsList
                {...{
                    checked,
                    unchecked,
                    triggerConfirm: memoTriggerConfirm,
                    triggerError: memoTriggerError,
                }}
            />
        </Box>
    );
};
