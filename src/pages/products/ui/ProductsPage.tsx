import React, { useCallback, useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { productsApi, type IProduct } from '@entities/product';
import { useLastError, useManageModal } from '@shared/lib/uiUtils';
import { ErrorAlert } from '@shared/ui/errorAlert';
import { ConfirmModal } from '@shared/ui/confirmModal';
import {
    ProductsList,
    TriggerContext,
    type ITriggerContext,
} from '@widgets/productsList';
import type { IControls } from '@widgets/productControls/model/types';
import { ProductsSearch } from '@features/productsSearch';

export const ProductsPage: React.FunctionComponent = () => {
    const [controls, setControls] = useState<IControls>({
        searchQuery: '',
    });

    const { data } = productsApi.useFetchAllProductsQuery('', {
        selectFromResult: ({ data }) => ({ data }),
    });

    const { order } = data ?? { order: [] };

    const { openFlag, errorMessage, closeError, triggerError } = useLastError();
    const { open, message, triggerConfirm, confirmAction, closeConfirm } =
        useManageModal();

    const memoTriggerConfirm = useCallback(triggerConfirm, []);
    const memoTriggerError = useCallback(triggerError, []);

    const triggerContextData = useMemo<ITriggerContext>(
        () => ({
            triggerConfirm: memoTriggerConfirm,
            triggerError: memoTriggerError,
        }),
        [],
    );

    const [checked, unchecked] = useMemo<[IProduct[], IProduct[]]>(() => {
        const checked: IProduct[] = [];
        const uncheked: IProduct[] = [];

        order.forEach(product => {
            const lowerLabel = product.label.toLowerCase();
            const lowerQuery = controls.searchQuery.toLowerCase();
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
    }, [order, controls.searchQuery]);

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
            <ProductsSearch
                searchQuery={controls.searchQuery}
                setQuery={newQuery =>
                    setControls({ ...controls, searchQuery: newQuery })
                }
            />
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
