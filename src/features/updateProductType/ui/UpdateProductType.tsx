import {
    ProductTypeAutocomplete,
    useProductMutation,
    type IProduct,
} from '@entities/product';

interface IUpdateProductTypeProps {
    product: IProduct;
    triggerError?: (arg: string) => void;
}

export const UpdateProductType: React.FunctionComponent<
    IUpdateProductTypeProps
> = ({ product, triggerError }) => {
    const errorMessage = `Произошла ошибка при редактировании типа продукта - ${product.label}`;
    const applyNewType = useProductMutation(
        product,
        'type',
        triggerError,
        errorMessage,
    );

    return (
        <ProductTypeAutocomplete
            productType={product.type}
            applyNewType={applyNewType}
        />
    );
};
