import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    type DialogProps,
} from '@mui/material';

interface IConfirmModalProps extends DialogProps {
    message: string;
    executeFn?: (() => void) | null;
    closeDialog: () => void;
}

export const ConfirmModal: React.FunctionComponent<IConfirmModalProps> = ({
    message,
    closeDialog,
    executeFn,
    ...restProps
}) => {
    const execute = () => {
        executeFn?.();
        closeDialog();
    };
    return (
        <Dialog onClose={closeDialog} {...restProps}>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog}>Нет</Button>
                <Button onClick={execute}>Да</Button>
            </DialogActions>
        </Dialog>
    );
};
