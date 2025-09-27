import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    type DialogProps,
} from '@mui/material';

// import type { TransitionProps } from '@mui/material/transitions';
// import type { JSX } from '@emotion/react/jsx-runtime';

// const Transition = React.forwardRef(function Transition(
//     props: TransitionProps & { children: JSX.Element },
//     ref: React.Ref<unknown>,
// ) {
//     return <Slide direction="up" ref={ref} {...props} />;
// });

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
