import { Autocomplete, TextField } from '@mui/material';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUniqueProductTypes } from '../api/selectors';
import { shallowEqual } from 'react-redux';

interface IProductTypeAutocompleteProps {
    productType?: string;
    applyNewType?: (arg: string) => void;
}

export const ProductTypeAutocomplete: React.FunctionComponent<
    IProductTypeAutocompleteProps
> = ({ productType, applyNewType }) => {
    //этот стейт нужен только для того, чтобы autocomplete не ругался,
    //и для того, чтобы обновлять отображаемое значение
    //в коллбек отправляется значение текстового поля, полученного с помощью useRef
    const initType = productType ?? '';
    const [localType, setLocalType] = useState<string>(initType);

    const productTypes: string[] = useSelector(
        selectUniqueProductTypes,
        shallowEqual,
    );

    // инициализация завершения режима ввода типа в случае набора текста
    const initEndOfEdit = () => {
        if (!inputRef.current) {
            return;
        }

        const type = inputRef.current.value;

        if (type == initType || !type) {
            setLocalType(initType);
            return;
        }

        setLocalType(type);
        applyNewType?.(type);
    };

    const inputRef = useRef<HTMLInputElement | null>(null);

    return (
        <>
            <Autocomplete
                freeSolo
                value={localType}
                options={productTypes}
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
