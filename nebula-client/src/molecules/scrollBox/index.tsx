import './index.styl';
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

export type Props = {
    children: React.ReactNode;
    styleMode?: 'dark' | 'light';
};

const ScrollBox = ({ children, styleMode = 'light' }: Props) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);

    const [offsetX, setOffsetX] = useState(0);
    const maxScrollRef = useRef(0);
    const updateScrollLimits = () => {
        if (containerRef.current && contentRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            const contentWidth = contentRef.current.scrollWidth;
            maxScrollRef.current = contentWidth - containerWidth;
            if (offsetX > maxScrollRef.current) {
                setOffsetX(Math.max(0, maxScrollRef.current)); // 保证 offset 不超出范围
            }
        }
    };

    useEffect(() => {
        updateScrollLimits();

        const resizeObserver = new ResizeObserver(updateScrollLimits);
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
            containerRef.current.addEventListener('wheel', handleScroll, {
                passive: false,
            });
        }
        if (contentRef.current) resizeObserver.observe(contentRef.current);

        return () => {
            if (containerRef.current) resizeObserver.unobserve(containerRef.current);
            if (contentRef.current) resizeObserver.unobserve(contentRef.current);
        };
    }, []);

    const handleScroll = (event: WheelEvent) => {
        event.preventDefault();
        if (maxScrollRef.current > 0) {
            const delta = event.deltaX;
            setOffsetX((prev) =>
                Math.max(0, Math.min(maxScrollRef.current, prev + delta)),
            );
        }
    };

    const contentClass = classNames('scroll-box-container', styleMode, {
        'scrollable-left': offsetX > 0,
        'scrollable-right': offsetX < maxScrollRef.current,
    });

    return (
        <div className={contentClass} ref={containerRef}>
            <div
                className='scroll-box-content'
                ref={contentRef}
                style={{
                    transform: `translateX(-${offsetX}px)`,
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default ScrollBox;
