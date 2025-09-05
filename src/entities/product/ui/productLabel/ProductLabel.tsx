import { ListItemText } from '@mui/material';
import type { IProduct } from '../../model/types';
import classes from './ProductLabel.module.css';

interface IProductLabelProps {
    product: IProduct;
}

export const ProductLabel: React.FunctionComponent<IProductLabelProps> = ({
    product,
}) => {
    const { label, isChecked } = product;
    return (
        <div className={classes.productLabelWrap}>
            <ListItemText
                primary={label}
                slotProps={{
                    primary: {
                        sx: {
                            fontSize: '1rem',
                            color: isChecked ? 'gray' : 'inherit',
                            userSelect: 'none',
                        },
                    },
                }}
            />
        </div>
    );
};
