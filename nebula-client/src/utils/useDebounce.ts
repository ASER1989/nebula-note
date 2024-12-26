import { useRef } from 'react';

export const useDebounce = (callback: Function, wait: number, maxWait?: number) => {
    const startTimeRef = useRef<number>();
    const timerRef = useRef<number>();

    return () => {
        startTimeRef.current = startTimeRef.current ?? Date.now();
        if (maxWait && Date.now() - startTimeRef.current > maxWait) {
            return;
        }
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            startTimeRef.current = undefined;
            callback();
        }, wait);
    };
};

export default useDebounce;
