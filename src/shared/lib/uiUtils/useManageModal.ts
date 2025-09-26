import { useState } from 'react';
interface IParams {
    openFlag?: boolean;
    initMessage?: string;
    initFunc?: (() => void) | null;
}
export const useManageModal = ({
    openFlag = false,
    initMessage = '',
    initFunc = null,
}: IParams = {}) => {
    const [open, setOpen] = useState<boolean>(openFlag);
    const [confirmAction, setConfirmAction] = useState<(() => void) | null>(
        () => initFunc,
    );
    const [message, setMessage] = useState<string>(initMessage);

    const triggerConfirm = (func: () => Promise<void>, m: string) => {
        setMessage(m);
        setConfirmAction(() => func);
        setOpen(true);
    };

    const closeConfirm = () => {
        setOpen(false);
    };
    return { open, message, triggerConfirm, confirmAction, closeConfirm };
};
