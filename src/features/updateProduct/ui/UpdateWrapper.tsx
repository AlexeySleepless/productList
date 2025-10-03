import { TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { productsApi, type IProduct } from '@entities/product';
import classes from './UpdateWrapper.module.css';

interface IUPdateWrapper {
    product: IProduct;
    readonly children: React.ReactNode;
    onError?: (arg: string) => void;
}

export const UpdateWrapper: React.FunctionComponent<IUPdateWrapper> = ({
    children,
    onError,
    product,
}) => {
    const [localLabel, setLocalLabel] = useState<string>(product.label);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [updateFn] = productsApi.useUpdateProductMutation();

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
            input.focus();
        }, 200);
        const textLen = input.value.length;
        input.setSelectionRange(textLen, textLen);
        return id;
    };

    // запуск подготовительных действий, как только будет получен inputRef
    useEffect(() => {
        if (!isEdit) {
            return;
        }
        const id = prepareTextfield();
        return () => clearTimeout(id);
    }, [isEdit]);

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
        updateFn({ ...product, label: localLabel })
            .unwrap()
            .catch(() => {
                onError?.(
                    `Произошла ошибка при редактировании продукта - ${product.label}`,
                );
            });
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
