import { CheckBox } from '@shared/ui/checkBox';
import classes from './ProductImportance.module.css';

interface IProductImportanceProps {
    productImprotance?: boolean;
    applyNewImportance?: (arg: boolean) => void;
}

export const ProductImportance: React.FunctionComponent<
    IProductImportanceProps
> = ({ productImprotance, applyNewImportance }) => {
    return (
        <CheckBox
            checked={productImprotance}
            onChange={e => {
                e.stopPropagation();
                applyNewImportance?.(!productImprotance);
            }}
            checkedWrapClassName={classes.checkedWrap}
            inputWrapClassName={classes.inputWrap}
            uncheckedSVG={
                <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            }
        >
            <span className={classes.span}>Важное</span>
        </CheckBox>
    );
};
