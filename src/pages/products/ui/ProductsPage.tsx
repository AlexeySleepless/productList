import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { productsApi, type IProduct } from '@entities/product';
import { useLastError, useManageModal } from '@shared/lib/uiUtils';
import { ErrorAlert } from '@shared/ui/errorAlert';
import { ConfirmModal } from '@shared/ui/confirmModal';
import {
    checkedSplit,
    ProductsList,
    TriggerContext,
    type ITriggerContext,
} from '@widgets/productsList';
import { useAppSelector } from '@shared/lib/store';
import { ProductsControl } from '@widgets/productsControls';
import { getPresetSearchFunc } from '@features/productsSearch';

export const ProductsPage: React.FunctionComponent = () => {
    const searchQuery = useAppSelector(
        state => state.productsControlReducer.searchQuery,
    );

    const { data } = productsApi.useFetchAllProductsQuery('', {
        selectFromResult: ({ data }) => ({ data }),
    });

    const { order } = data ?? { order: [] };

    const { openFlag, errorMessage, closeError, triggerError } = useLastError();
    const { open, message, triggerConfirm, confirmAction, closeConfirm } =
        useManageModal();

    const triggerContextData = useMemo<ITriggerContext>(
        () => ({
            triggerConfirm,
            triggerError,
        }),
        [],
    );

    const [checked, unchecked] = useMemo<[IProduct[], IProduct[]]>(() => {
        const searchFn = getPresetSearchFunc(searchQuery);
        return checkedSplit(order, searchFn);
    }, [order, searchQuery]);

    return (
        <Box
            sx={{
                maxWidth: 700,
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
            <ProductsControl />
            <TriggerContext.Provider value={triggerContextData}>
                <ProductsList
                    {...{
                        checked,
                        unchecked,
                    }}
                />
            </TriggerContext.Provider>
        </Box>
    );
};
