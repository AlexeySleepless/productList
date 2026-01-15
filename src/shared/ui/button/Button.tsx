import classes from './Button.module.css';

type IButton = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FunctionComponent<IButton> = ({
    children,
    ...rest
}) => {
    return (
        <button className={classes.button} {...rest}>
            {children}
        </button>
    );
};
