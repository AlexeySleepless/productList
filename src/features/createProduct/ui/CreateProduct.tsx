import { productsApi } from '@entities/product';
import Add from '@mui/icons-material/Add';
import {
    Button,
    Drawer,
    ListItemIcon,
    ListItemText,
    TextField,
} from '@mui/material';
import { StyledListItem } from '@shared/ui/styledListItem';
import type React from 'react';
import { useRef, useState } from 'react';

interface IСreateProductProps {
    triggerError?: (arg: string) => void;
    triggerCreateUI?: (
        ui: React.ReactNode,
        fn: () => void,
        message: string,
    ) => void;
}

export const CreateProduct: React.FunctionComponent<IСreateProductProps> = ({
    triggerError,
}) => {
    const label = 'Добавить продукт';
    const [value, setValue] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const [createFn] = productsApi.useCreateProductMutation();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const createProduct = () => {
        const id = Date.now();
        createFn({
            id,
            label: value,
            isChecked: false,
            type: '',
            important: false,
        })
            .unwrap()
            .catch(() => {
                triggerError?.('Не удалось создать продукт');
            });
    };

    const addProduct = () => {
        createProduct();
        setValue('');
        setOpen(false);
    };

    const showDrawer = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        event.preventDefault();
        setOpen(true);
        setTimeout(() => {
            inputRef.current?.focus();
        }, 200);
    };
    return (
        <>
            <StyledListItem
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}
                onClick={showDrawer}
            >
                <ListItemIcon
                    sx={{
                        minWidth: 50,
                        minHeight: 50,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'black',
                    }}
                >
                    <Add />
                </ListItemIcon>
                <ListItemText
                    primary={label}
                    slotProps={{
                        primary: {
                            sx: {
                                fontSize: '1rem',
                                userSelect: 'none',
                            },
                        },
                    }}
                />
            </StyledListItem>
            <Drawer
                open={open}
                anchor="bottom"
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
                <TextField
                    value={value}
                    inputRef={inputRef}
                    label="Название продукта"
                    variant="outlined"
                    onChange={e => {
                        setValue(e.target.value);
                    }}
                    onKeyDown={event => {
                        if (event.key === 'Enter') {
                            addProduct();
                        }
                    }}
                ></TextField>
                <Button
                    variant="outlined"
                    onClick={() => {
                        addProduct();
                    }}
                >
                    Добавить продукт
                </Button>
            </Drawer>
        </>
    );
};
