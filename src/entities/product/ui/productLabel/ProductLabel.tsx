import type { IProduct } from '../../model/types';
import classes from './ProductLabel.module.css';

interface IProductLabelProps {
    product: IProduct;
}

export const ProductLabel: React.FunctionComponent<IProductLabelProps> = ({
    product,
}) => {
    const { label, isChecked } = product;
    const classNames = isChecked
        ? `${classes.productLabel} ${classes.checkedLabel}`
        : classes.productLabel;
    return (
        <div className={classes.productLabelWrap}>
            <div className={classNames}>{label}</div>
        </div>
    );
};
