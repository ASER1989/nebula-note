import { useEffect, useRef, useState } from 'react';

export const useBoxSize = () => {
    const boxRef = useRef<HTMLDivElement>(null);
    const [boxSize, setBoxSize] = useState({ width: 'auto', height: 'auto' });

    const updateSize = () => {
        const width = boxRef.current?.offsetWidth;
        const height = boxRef.current?.offsetHeight;
        setBoxSize({
            width: width ? `${width}px` : 'auto',
            height: height ? `${height}px` : 'auto',
        });
    };
    useEffect(() => {
        const resizeObserver = new ResizeObserver(updateSize);
        if (boxRef.current) {
            //监听boxSize宽度变化
            resizeObserver.observe(boxRef.current);
        }
        return () => {
            if (boxRef.current) {
                resizeObserver.unobserve(boxRef.current);
            }
        };
    }, []);

    return { boxRef, boxSize };
};
