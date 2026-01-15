import { productsApi, type IProduct } from '@entities/product';
import { CheckBox } from '@shared/ui/checkBox';

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
    const checkBoxHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        <>
            <CheckBox checked={isChecked} onChange={checkBoxHandler} />
        </>
    );
};
