import { CheckBox } from '@shared/ui/checkBox';
import classes from './ProductFavorite.module.css';
import { classes as externalClasses } from '@shared/ui/checkBox';
import { SvgIcon } from '@shared/ui/svgIcon';

interface IProductFavoriteProps {
    productFavorite?: boolean;
    applyNewFavorite?: (arg: boolean) => void;
}

export const ProductFavorite: React.FunctionComponent<
    IProductFavoriteProps
> = ({ productFavorite, applyNewFavorite }) => {
    const wrappedClasses = productFavorite
        ? `${classes.checkedWrap} ${classes.inputWrap}`
        : classes.inputWrap;
    return (
        <CheckBox
            checked={productFavorite}
            onChange={e => {
                e.stopPropagation();
                applyNewFavorite?.(!productFavorite);
            }}
            className={wrappedClasses}
        >
            <div className={classes.checkBoxWrap}>
                <SvgIcon className={externalClasses.checkBoxRect}>
                    <path d="m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z" />
                </SvgIcon>
            </div>
            <span className={classes.span}>Любимое</span>
        </CheckBox>
    );
};
