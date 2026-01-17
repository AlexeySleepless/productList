import type { IProduct } from '@entities/product/model/types';
import classes from './ProductMarks.module.css';
import type React from 'react';

interface IProductMarks {
    product: IProduct;
}
export const ProductMarks: React.FunctionComponent<IProductMarks> = ({
    product,
}) => {
    const { important, favorite } = product;
    const value: number = 2 * +important + 1 * +favorite;
    if (!value) {
        return null;
    }
    let trianglesClasses = classes.params;
    let line1Classes = classes.params;
    //у сдвинутой линии всегда будет такой стиль, если она визуализируется
    const line2Classes = `${classes.params} ${classes.favoriteParams} ${classes.shiftMarkLine}`;

    const params = value < 2 ? classes.favoriteParams : classes.importantParams;
    trianglesClasses += ` ${params} ${classes.mark}`;
    line1Classes += ` ${params} ${classes.markLine}`;

    return (
        <>
            <div className={trianglesClasses}></div>
            <div className={line1Classes}></div>
            {value > 2 && <div className={line2Classes}></div>}
        </>
    );
};
