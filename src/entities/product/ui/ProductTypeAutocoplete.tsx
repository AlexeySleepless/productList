import {
    Autocomplete,
    Button,
    Drawer,
    TextField,
    type ButtonBaseProps,
} from '@mui/material';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUniqueProductTypes } from '../api/selectors';
import { shallowEqual } from 'react-redux';

interface IProductTypeAutocompleteProps extends ButtonBaseProps {
    productType?: string;
    applyNewType?: (arg: string) => void;
}

export const ProductTypeAutocomplete: React.FunctionComponent<
    IProductTypeAutocompleteProps
> = ({ productType, applyNewType }) => {
    const [open, setOpen] = useState<boolean>(false);

    //этот стейт нужен только для того, чтобы autocomplete не ругался,
    //и для того, чтобы обновлять отображаемое значение
    //в коллбек отправляется значение текстового поля, полученного с помощью useRef
    const initType = productType ?? '';
    const [localType, setLocalType] = useState<string>(initType);

    const productTypes: string[] = useSelector(
        selectUniqueProductTypes,
        shallowEqual,
    );
    const inputRef = useRef<HTMLInputElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    // инициализация завершения режима ввода типа в случае набора текста
    const initEndOfEdit = () => {
        if (!inputRef.current) {
            return;
        }

        const type = inputRef.current.value;

        if (type == initType || +type == 0) {
            setLocalType(initType);
            return;
        }

        setLocalType(type);
        applyNewType?.(type);
    };

    return (
        <>
            <Button
                variant="outlined"
                ref={buttonRef}
                color="primary"
                sx={{
                    justifyContent: 'start',
                    color: localType ? null : 'rgba(0, 0, 0, 0.6)',
                    fontWeight: 400,
                    fontSize: '1rem',
                    lineHeight: 1.5,
                    borderColor: localType ? null : 'rgba(0, 0, 0, 0.23)',
                    minHeight: '42px',
                }}
                onClick={() => {
                    setOpen(true);
                    //для того, чтобы фокус не вернулся при закрытии окна (залипший риппл)
                    buttonRef.current?.blur();
                }}
            >
                {localType || 'Тип не установлен'}
            </Button>
            <Drawer
                open={open}
                anchor="top"
                onClose={() => {
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
                            autoFocus
                            onKeyDown={event => {
                                if (event.key === 'Enter') {
                                    initEndOfEdit();
                                    inputRef.current?.blur();
                                    Promise.resolve().then(() => {
                                        setOpen(false);
                                    });
                                }
                            }}
                        />
                    )}
                />
            </Drawer>
        </>
    );
};
