import { useEffect, useRef, useState } from 'react';

export const useStateSync = <T>(initialState?: T) => {
    const [state, setState] = useState<T>(initialState as T);
    const resolveRef = useRef<() => void>();
    useEffect(() => {
        resolveRef.current?.();
    }, [state]);

    const setStateSync = (newState: T) => {
        (async () => {
            const handle = new Promise<void>((resolve) => {
                resolveRef.current = resolve;
            });
            setState(newState);
            await handle;
        })();
    };
    return [state, setStateSync];
};
