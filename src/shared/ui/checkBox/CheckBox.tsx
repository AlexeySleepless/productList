import { useId, type JSX } from 'react';
import classes from './CheckBox.module.css';

interface ICheckBox extends React.InputHTMLAttributes<HTMLInputElement> {
    checkedSVG?: JSX.Element;
    uncheckedSVG?: JSX.Element;
    children?: JSX.Element;
    checkedWrapClassName?: string;
    inputWrapClassName?: string;
    labelProps?: Omit<
        React.LabelHTMLAttributes<HTMLLabelElement>,
        'htmlFor' | 'className'
    >;
}

export const CheckBox: React.FunctionComponent<ICheckBox> = ({
    checked,
    checkedSVG,
    uncheckedSVG,
    children,
    checkedWrapClassName,
    inputWrapClassName,
    labelProps,
    ...inputRest
}) => {
    const id = useId();
    const checkedWrap = checkedWrapClassName || classes.checkedWrap;
    const inputWrap = inputWrapClassName || classes.inputWrap;
    const wrappedClasses = checked ? `${inputWrap} ${checkedWrap}` : inputWrap;

    const checkedElems = checkedSVG || uncheckedSVG || (
        <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
    );
    const uncheckedElems = uncheckedSVG || (
        <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path>
    );
    const props = labelProps || {};
    return (
        <label htmlFor={id} className={wrappedClasses} {...props}>
            <input
                id={id}
                type="checkbox"
                checked={checked}
                className={classes.input}
                {...inputRest}
            />
            <div className={classes.checkBoxWrap}>
                <svg
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className={classes.checkBoxRect}
                >
                    {checked ? checkedElems : uncheckedElems}
                </svg>
            </div>
            {children}
        </label>
    );
};
