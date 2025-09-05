import { Alert, Snackbar, TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { productsApi, type IProduct } from '@entities/product';
import classes from './UpdateWrapper.module.css';

interface IUPdateWrapper {
    product: IProduct;
    readonly children: React.ReactNode;
}

export const UpdateWrapper: React.FunctionComponent<IUPdateWrapper> = ({
    children,
    product,
}) => {
    const [localLabel, setLocalLabel] = useState<string>(product.label);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [updateFn, { error }] = productsApi.useUpdateProductMutation();

    // подготовительные действия над полем ввода
    const prepareTextfield = () => {
        const input = inputRef.current;
        if (!input) {
            return;
        }
        const id = setTimeout(() => {
            input.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        }, 200);
        const textLen = input.value.length;
        input.focus();
        input.setSelectionRange(textLen, textLen);
        return id;
    };

    const [openError, setOpenError] = useState<boolean>(false);
    const closeError = () => {
        setOpenError(false);
    };

    // запуск подготовительных действий, как только будет получен inputRef
    useEffect(() => {
        if (!isEdit) {
            return;
        }
        const id = prepareTextfield();
        return () => clearTimeout(id);
    }, [isEdit]);

    useEffect(() => {
        if (!error) {
            return;
        }
        setOpenError(true);
        return () => {
            setOpenError(false);
        };
    }, [error]);

    // запуск режима редактирования
    const activatedEditMode = (
        event: React.MouseEvent<HTMLElement, MouseEvent>,
    ) => {
        event.stopPropagation();
        setIsEdit(true);
        setLocalLabel(product.label);
    };

    // инициализация завершения режима редактирования
    const initEndOfEdit = async () => {
        if (localLabel == product.label || !localLabel) {
            setIsEdit(false);
            return;
        }
        updateFn({ ...product, label: localLabel });
        setIsEdit(false);
    };

    // контрол, предоставляющий возможность редактирования
    const editControl = (
        <div className={classes.editWrapper}>
            <TextField
                sx={{
                    flexGrow: 1,
                    justifyContent: 'center',
                }}
                inputRef={inputRef}
                value={localLabel}
                multiline
                onChange={e => {
                    setLocalLabel(e.target.value);
                }}
                onBlur={initEndOfEdit}
                onKeyDown={event => {
                    if (event.key === 'Enter') {
                        initEndOfEdit();
                    }
                }}
                autoFocus
                size="small"
                variant="standard"
            />
        </div>
    );
    return (
        <>
            <Snackbar
                open={openError}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={5000}
                onClose={closeError}
            >
                <Alert
                    severity="error"
                    variant="filled"
                    onClose={closeError}
                    sx={{
                        alignItems: 'center',
                    }}
                >
                    {`Произошла ошибка при редактировании продукта - ${product.label}`}
                </Alert>
            </Snackbar>
            {isEdit ? (
                editControl
            ) : (
                <div
                    className={classes.saveNestedDiv}
                    onClick={activatedEditMode}
                >
                    {children}
                </div>
            )}
        </>
    );
};
