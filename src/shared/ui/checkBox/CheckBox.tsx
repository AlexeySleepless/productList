import { useId } from 'react';
import classes from './CheckBox.module.css';

type ICheckBox = React.InputHTMLAttributes<HTMLInputElement>;

export const CheckBox: React.FunctionComponent<ICheckBox> = ({
    checked,
    ...rest
}) => {
    const id = useId();
    const wrappedClasses = checked
        ? `${classes.inputWrap} ${classes.checkedWrap}`
        : classes.inputWrap;
    return (
        <label
            htmlFor={id}
            className={wrappedClasses}
            aria-label="Отметить продукт"
        >
            <input
                id={id}
                type="checkbox"
                checked={checked}
                className={classes.input}
                {...rest}
            />
            <svg
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                className={classes.checkBoxRect}
            >
                {checked ? (
                    <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                ) : (
                    <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path>
                )}
            </svg>
        </label>
    );
};
