import { useCallback, useRef, useState } from 'react';

export const useLastError = (initDelay?: number) => {
    const delay = initDelay ?? 5000;
    const [openError, setOpenError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const timerIdRef = useRef<number>(0);

    const closeError = useCallback(() => {
        setOpenError(false);
        setErrorMessage('');
    }, []);

    const triggerError = useCallback(
        (message: string): void => {
            setErrorMessage(message);
            setOpenError(true);
            const timerId = timerIdRef.current;
            if (timerId) {
                clearTimeout(timerId);
            }
            timerIdRef.current = setTimeout(closeError, delay);
        },
        [delay],
    );
    return {
        openFlag: openError,
        errorMessage,
        closeError,
        triggerError,
    };
};
