import { useProductMutation, type IProduct } from '@entities/product';
import { DefaultCheckBox } from '@shared/ui/checkBox';
import classes from './ToggleProduct.module.css';

interface IToggleProductProps {
    product: IProduct;
    triggerError?: (arg: string) => void;
}

export const ToggleProduct: React.FunctionComponent<IToggleProductProps> = ({
    product,
    triggerError,
}) => {
    const { isChecked } = product;
    const errorMessage = `Произошла ошибка при смене статуса продукта- ${product.label}`;
    const applyNewFlag = useProductMutation(
        product,
        'isChecked',
        triggerError,
        errorMessage,
    );
    const checkBoxHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        applyNewFlag(!isChecked);
    };

    return (
        <>
            <DefaultCheckBox
                checked={isChecked}
                onChange={checkBoxHandler}
                checkedClassName={classes.checked}
            />
        </>
    );
};
