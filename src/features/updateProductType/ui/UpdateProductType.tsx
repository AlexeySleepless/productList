import { productsApi, type IProduct } from '@entities/product';
import { Autocomplete, TextField } from '@mui/material';
import { useRef, useState } from 'react';

interface IUpdateProductTypeProps {
    product: IProduct;
    triggerError?: (arg: string) => void;
}

export const UpdateProductType: React.FunctionComponent<
    IUpdateProductTypeProps
> = ({ product, triggerError }) => {
    //этот стейт нужен только для того, чтобы autocomplete не ругался,
    //и для того, чтобы обновлять отображаемое значение
    //в хранилище отправляется значение текстового поля, полученного с помощью useRef
    const [localType, setLocalType] = useState<string>(product.type);

    const { data: productTypes = [] } =
        productsApi.useFetchAllProductTypesQuery('');
    const [updateFn] = productsApi.useUpdateProductMutation();

    // инициализация завершения режима редактирования типа в случае набора текста
    const initEndOfEdit = () => {
        if (!inputRef.current) {
            return;
        }

        const type = inputRef.current.value;

        //console.log('init end of edit', type);

        if (type == product.type || !type) {
            setLocalType(product.type);
            return;
        }

        console.log('to storage', inputRef.current?.value);

        setLocalType(inputRef.current.value);
        updateFn({ ...product, type: inputRef.current.value })
            .unwrap()
            .catch(() => {
                triggerError?.(
                    `Произошла ошибка при редактировании типа продукта - ${product.label}`,
                );
            });
    };

    const inputRef = useRef<HTMLInputElement | null>(null);

    ///сначала initEndOfedit onblur textfield потом onchange autocomplete!!!!

    return (
        <>
            <Autocomplete
                freeSolo
                value={localType}
                options={productTypes}
                // onChange={(event, newValue) => {
                //     event.preventDefault();
                //     if (!newValue) {
                //         newValue = '';
                //     }
                //     console.log('onchange:', newValue, localType);
                //     setLocalType(newValue);
                // }}
                onBlur={initEndOfEdit}
                renderInput={params => (
                    <TextField
                        {...params}
                        label="Тип продукта"
                        inputRef={inputRef}
                        variant="outlined"
                        onKeyDown={event => {
                            if (event.key === 'Enter') {
                                initEndOfEdit();
                                inputRef.current?.blur();
                            }
                        }}
                    />
                )}
            />
        </>
    );
};
