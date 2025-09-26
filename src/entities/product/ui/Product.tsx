import {
    alpha,
    Button,
    Checkbox,
    checkboxClasses,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    IconButton,
    ListItem,
    ListItemIcon,
    useTheme,
} from '@mui/material';
import type { IProduct } from '../model/types';
import React, { useState } from 'react';
import { Close } from '@mui/icons-material';
import { ProductLabel } from './productLabel/ProductLabel';
// import type { TransitionProps } from '@mui/material/transitions';
// import type { JSX } from '@emotion/react/jsx-runtime';

// const Transition = React.forwardRef(function Transition(
//     props: TransitionProps & { children: JSX.Element },
//     ref: React.Ref<unknown>,
// ) {
//     return <Slide direction="up" ref={ref} {...props} />;
// });

interface IProductProps {
    product: IProduct;
    updateAction?: React.ReactNode;
    deleteAction?: React.ReactNode;
    handleToggle?: (id: number) => void;
}

export const Product: React.FunctionComponent<IProductProps> = ({
    product,
    handleToggle,
    updateAction,
    deleteAction,
}) => {
    const { isChecked } = product;
    const theme = useTheme();

    ///============================редактирование============================================
    // const [localLabel, setLocalLabel] = useState<string>(product.label);
    // const [isEdit, setIsEdit] = useState<boolean>(false);
    // const inputRef = useRef<HTMLDivElement | null>(null);

    // const handleFocus = () => {
    //     setTimeout(() => {
    //         inputRef.current?.scrollIntoView({
    //             behavior: 'smooth',
    //             block: 'nearest',
    //         });
    //     }, 200);
    // };

    // const productHandler = (
    //     event: React.MouseEvent<HTMLElement, MouseEvent>,
    // ) => {
    //     event.stopPropagation();
    //     setIsEdit(true);
    // };
    // const editControl = (
    //     <TextField
    //         ref={inputRef}
    //         value={localLabel}
    //         onChange={e => {
    //             setLocalLabel(e.target.value);
    //         }}
    //         onFocus={handleFocus}
    //         onBlur={() => {
    //             setIsEdit(false);
    //             editLabel?.(product.id, localLabel);
    //         }}
    //         onKeyDown={event => {
    //             if (event.key === 'Enter') {
    //                 setIsEdit(false);
    //                 editLabel?.(product.id, localLabel);
    //             }
    //         }}
    //         autoFocus
    //         size="small"
    //         variant="standard"
    //     />
    // );
    const readyTexField = updateAction ? (
        updateAction
    ) : (
        <ProductLabel product={product} />
    );

    ///==================================toggle==========================================

    const checkBoxHandler = (
        event: React.MouseEvent<HTMLElement, MouseEvent>,
    ) => {
        event.stopPropagation();
        handleToggle?.(product.id);
    };

    const checkBoxControl = (
        <ListItemIcon
            sx={{
                minWidth: 50,
                minHeight: 50,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Checkbox
                checked={isChecked}
                onClick={checkBoxHandler}
                disableRipple
                sx={{
                    transition: 'color 0.3s ease',
                    color: isChecked ? 'gray' : 'black',
                    [`&.${checkboxClasses.checked}`]: {
                        color: 'gray',
                    },
                }}
            />
        </ListItemIcon>
    );

    ///==================================удаление============================================

    const [open, setOpen] = useState<boolean>(false);
    const initDeleteProduct = (
        event: React.MouseEvent<HTMLElement, MouseEvent>,
    ) => {
        console.log('delete click');
        event.stopPropagation();
        setOpen(true);
    };

    const closeDialog = () => {
        setOpen(false);
    };
    const deleteProductFeature = (
        <>
            <IconButton
                onClick={initDeleteProduct}
                aria-label="delete product"
                sx={{
                    minWidth: 50,
                    minHeight: 50,
                }}
            >
                <Close />
            </IconButton>
            <Dialog
                open={open}
                onClose={closeDialog}
                keepMounted={false}
                slots={
                    {
                        //transition: Transition,
                    }
                }
            >
                <DialogContent>
                    <DialogContentText>
                        Вы уверенны, что хотите удалить?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>Нет</Button>
                    <Button onClick={closeDialog}>Да</Button>
                </DialogActions>
            </Dialog>
        </>
    );
    ///===================================

    return (
        <ListItem
            disablePadding
            //secondaryAction={deleteProductFeature}
            sx={{
                padding: '5px',
                alignItems: 'stretch',
                '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.15),
                },
                '@media (pointer: coarse)': {
                    '&:hover': {
                        backgroundColor: 'transparent',
                    },
                    '&:focus-visible': {
                        backgroundColor: 'transparent',
                    },
                },
            }}
        >
            {checkBoxControl}

            {readyTexField}

            {deleteAction}
        </ListItem>
    );
};
