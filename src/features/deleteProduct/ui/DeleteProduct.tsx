import { productsApi, type IProduct } from '@entities/product';
import Close from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

interface IDeleteProductProps {
    product: IProduct;
    triggerConfirm?: (arg1: () => Promise<void>, arg2: string) => void;
    triggerError?: (arg: string) => void;
}

export const DeleteProduct: React.FunctionComponent<IDeleteProductProps> = ({
    product,
    triggerConfirm,
    triggerError,
}) => {
    const { id, label } = product;
    const [deleteFn] = productsApi.useDeleteProductMutation();
    const deleteProduct = async () => {
        try {
            await deleteFn(id).unwrap();
        } catch {
            triggerError?.(`Не удалось удалить продукт - ${label}`);
        }
    };
    const initDeleteProduct = () => {
        if (triggerConfirm) {
            triggerConfirm(
                deleteProduct,
                `Вы уверены что хотите удалить данный продукт - ${label}?`,
            );
        } else {
            deleteProduct();
        }
    };

    return (
        <IconButton
            onClick={initDeleteProduct}
            aria-label="Удалить продукт"
            sx={{
                minWidth: 50,
                minHeight: 50,
            }}
        >
            <Close />
        </IconButton>
    );
};
