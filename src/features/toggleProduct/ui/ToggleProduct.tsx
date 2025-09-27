import { productsApi, type IProduct } from '@entities/product';
import { Checkbox, checkboxClasses, ListItemIcon } from '@mui/material';

interface IToggleProductProps {
    product: IProduct;
    triggerError?: (arg: string) => void;
}

export const ToggleProduct: React.FunctionComponent<IToggleProductProps> = ({
    product,
    triggerError,
}) => {
    const { isChecked } = product;
    const [updateFn] = productsApi.useUpdateProductMutation();
    const checkBoxHandler = (
        event: React.MouseEvent<HTMLElement, MouseEvent>,
    ) => {
        event.stopPropagation();
        updateFn({ ...product, isChecked: !isChecked })
            .unwrap()
            .catch(() => {
                triggerError?.(
                    `Произошла ошибка при смене статуса продукта - ${product.label}`,
                );
            });
    };
    return (
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
};
