import './index.styl';
import React, { useState, useMemo } from 'react';

type Props = {
    children: any;
    extendChild: any;
};
export default function SideBySide({ children, extendChild }: Props) {
    const [offset, setOffset] = useState(0);

    const [position, setPosition] = useState<any>(null);

    const handleTouchStart = (e: any) => {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setDragImage(new Image(), e.clientX, e.clientY);
        setPosition(e.clientX + offset);
    };
    const handleTouchEnd = () => {
        setPosition(null);
    };

    const handleTouchMove = (e: any) => {
        if (position && e.clientX) {
            requestAnimationFrame(() => {
                setOffset(position - e.clientX);
            });
        }
    };

    const memoStyle = useMemo(() => {
        return {
            width: `calc(50% - 3px - ${offset}px)`,
            flex: 'none',
        };
    }, [offset]);

    return (
        <div className='sideBySide'>
            <div className='side' style={{ ...memoStyle }}>
                {children}
            </div>
            <div
                className='gutter'
                // onMouseDown={handleTouchStart}
                // onMouseMove={handleTouchMove}
                // onMouseUp={handleTouchEnd}
                draggable
                onDragStart={handleTouchStart}
                onDragEnd={handleTouchEnd}
                onDrag={handleTouchMove}
            ></div>
            <div className='side side-innerscroll'>
                {typeof extendChild === 'function' ? extendChild() : extendChild}
            </div>
        </div>
    );
}
