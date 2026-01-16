import { useCallback, useEffect, useRef } from 'react';

export function useDebounce<T extends (...args: never[]) => unknown>(
    callback: T,
    delay: number,
): (...args: Parameters<T>) => void {
    const callbackRef = useRef<T>(callback);
    const timeoutRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        return () => clearTimeout(timeoutRef.current);
    }, []);

    const a = useCallback(
        (...args: Parameters<T>) => {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                callbackRef.current?.(...args);
            }, delay);
        },
        [delay],
    );

    return a;
}
