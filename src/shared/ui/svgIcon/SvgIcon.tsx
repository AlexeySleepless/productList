import classes from './SvgIcon.module.css';

type ISvgIcon = React.SVGProps<SVGSVGElement>;

export const SvgIcon: React.FunctionComponent<ISvgIcon> = ({
    children,
    ...rest
}) => {
    return (
        <svg
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            className={classes.svg}
            {...rest}
        >
            {children}
        </svg>
    );
};
