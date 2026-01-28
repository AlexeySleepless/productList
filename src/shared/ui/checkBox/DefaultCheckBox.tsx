import { CheckBox } from './CheckBox';
import classes from './CheckBox.module.css';
import type { IsolateCheckBox } from './types';

interface IDefaultCheckBox extends IsolateCheckBox {
    checkedClassName?: string;
}

export const DefaultCheckBox: React.FunctionComponent<IDefaultCheckBox> = ({
    checked,
    className,
    checkedClassName,
    ...rest
}) => {
    const defaultClassName = className || classes.inputWrap;
    const checkedClassNames = checkedClassName
        ? `${checkedClassName} ${defaultClassName}`
        : defaultClassName;
    const wrappedClasses = checked ? checkedClassNames : defaultClassName;
    return (
        <CheckBox className={wrappedClasses} {...rest}>
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
        </CheckBox>
    );
};
