import { useEffect, useRef } from 'react';

const useNextTick = () => {
    const callbacksRef = useRef<(() => void)[]>([]);

    useEffect(() => {
        if (callbacksRef.current.length > 0) {
            const callbacks = callbacksRef.current;
            callbacksRef.current = [];
            callbacks.forEach((cb) => cb());
        }
    });

    return (callback: () => void) => {
        callbacksRef.current.push(callback);
    };
};

export default useNextTick;
