import {
    productsApi,
    ProductTypeAutocomplete,
    type IProduct,
} from '@entities/product';

interface IUpdateProductTypeProps {
    product: IProduct;
    triggerError?: (arg: string) => void;
}

export const UpdateProductType: React.FunctionComponent<
    IUpdateProductTypeProps
> = ({ product, triggerError }) => {
    const [updateFn] = productsApi.useUpdateProductMutation();
    const applyNewType = (type: string) => {
        updateFn({ ...product, type })
            .unwrap()
            .catch(() => {
                triggerError?.(
                    `Произошла ошибка при редактировании типа продукта - ${product.label}`,
                );
            });
    };

    return (
        <ProductTypeAutocomplete
            productType={product.type}
            applyNewType={applyNewType}
        />
    );
};
