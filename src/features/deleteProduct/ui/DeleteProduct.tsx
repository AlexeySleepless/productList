import { productsApi, type IProduct } from '@entities/product';
import { Button } from '@shared/ui/button/Button';
import { SvgIcon } from '@shared/ui/svgIcon';

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
        <>
            <Button onClick={initDeleteProduct} aria-label="Удалить продукт">
                <SvgIcon>
                    <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                </SvgIcon>
            </Button>
        </>
    );
};
