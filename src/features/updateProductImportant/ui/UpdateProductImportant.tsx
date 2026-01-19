import {
    ProductImportance,
    useProductMutation,
    type IProduct,
} from '@entities/product';
interface IUpdateProductImportantProps {
    product: IProduct;
    triggerError?: (arg: string) => void;
}

export const UpdateProductImportant: React.FunctionComponent<
    IUpdateProductImportantProps
> = ({ product, triggerError }) => {
    const errorMessage = `Произошла ошибка при изменении статуса важности продукта- ${product.label}`;
    const applyNewFlag = useProductMutation(
        product,
        'important',
        triggerError,
        errorMessage,
    );

    return (
        <ProductImportance
            productImprotance={product.important}
            applyNewImportance={applyNewFlag}
        />
    );
};
