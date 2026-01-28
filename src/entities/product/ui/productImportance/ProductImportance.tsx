import { CheckBox } from '@shared/ui/checkBox';
import classes from './ProductImportance.module.css';
import { classes as externalClasses } from '@shared/ui/checkBox';
import { SvgIcon } from '@shared/ui/svgIcon';

interface IProductImportanceProps {
    productImportance?: boolean;
    applyNewImportance?: (arg: boolean) => void;
}

export const ProductImportance: React.FunctionComponent<
    IProductImportanceProps
> = ({ productImportance, applyNewImportance }) => {
    const wrappedClasses = productImportance
        ? `${classes.checkedWrap} ${classes.inputWrap}`
        : classes.inputWrap;
    return (
        <CheckBox
            checked={productImportance}
            onChange={e => {
                e.stopPropagation();
                applyNewImportance?.(!productImportance);
            }}
            className={wrappedClasses}
        >
            <div className={classes.checkBoxWrap}>
                <SvgIcon className={externalClasses.checkBoxRect}>
                    <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </SvgIcon>
            </div>
            <span className={classes.span}>Важное</span>
        </CheckBox>
    );
};
