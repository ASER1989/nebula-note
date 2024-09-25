import React, {useState, useEffect} from 'react';

type PerformanceState<T> = {
    current: T
}

export default function Performance() {
    const [memory, setMemory] = useState<PerformanceState<any>>();

    useEffect(() => {
        const timer = setInterval(() => {
            // @ts-ignore
            const newMemory = window?.performance?.memory;
            setMemory({
                current: newMemory
            })
        }, 1500);
        return () => {
            clearInterval(timer);
        }
    });

    return (
        <div>
            内存：{((memory?.current?.usedJSHeapSize ?? 0) / 8 / 1024 / 1024).toFixed(2)}MB
        </div>
    )
}