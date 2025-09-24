import { useState } from 'react';

export const useLastError = () => {
    const [openError, setOpenError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [timerId, setTimerId] = useState<number>(0);
    const closeError = () => {
        setOpenError(false);
        setErrorMessage('');
    };
    const handleError = (message: string): void => {
        setErrorMessage(message);
        setOpenError(true);
        if (timerId) {
            clearTimeout(timerId);
        }
        const id = setTimeout(closeError, 5000);
        setTimerId(id);
    };
    return {
        openFlag: openError,
        errorMessage,
        closeError,
        triggerError: handleError,
    };
};
