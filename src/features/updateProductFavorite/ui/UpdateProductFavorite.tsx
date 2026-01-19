import {
    ProductFavorite,
    useProductMutation,
    type IProduct,
} from '@entities/product';
interface IUpdateProductFavoriteProps {
    product: IProduct;
    triggerError?: (arg: string) => void;
}

export const UpdateProductFavorite: React.FunctionComponent<
    IUpdateProductFavoriteProps
> = ({ product, triggerError }) => {
    const errorMessage = `Произошла ошибка при изменении статуса избранности продукта- ${product.label}`;
    const applyNewFlag = useProductMutation(
        product,
        'favorite',
        triggerError,
        errorMessage,
    );

    return (
        <ProductFavorite
            productFavorite={product.favorite}
            applyNewFavorite={applyNewFlag}
        />
    );
};
