import { Alert, Snackbar, type SnackbarProps } from '@mui/material';

interface IErrorAlertProps extends SnackbarProps {
    message: string;
}

export const ErrorAlert: React.FunctionComponent<IErrorAlertProps> = ({
    onClose,
    message,
    ...restProps
}) => {
    const alertClose = (event: React.SyntheticEvent<Element, Event>) => {
        onClose?.(event, 'clickaway');
    };
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            onClose={onClose}
            {...restProps}
        >
            <Alert
                severity="error"
                variant="filled"
                onClose={alertClose}
                sx={{
                    alignItems: 'center',
                }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};
