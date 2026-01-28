import { useId } from 'react';
import classes from './CheckBox.module.css';
import type { IsolateCheckBox, IsolateLabel } from './types';

interface ICheckBox extends IsolateCheckBox {
    checked?: boolean;
    children?: React.ReactNode;
    labelProps?: IsolateLabel;
}

export const CheckBox: React.FunctionComponent<ICheckBox> = ({
    children,
    labelProps,
    style,
    className,
    ...rest
}) => {
    const id = useId();
    const defaultClassName = classes.label;
    const classNames = className
        ? `${defaultClassName} ${className}`
        : defaultClassName;
    return (
        <label
            htmlFor={id}
            style={style}
            className={classNames}
            {...labelProps}
        >
            <input
                id={id}
                type="checkbox"
                className={classes.input}
                {...rest}
            />
            {children}
        </label>
    );
};
