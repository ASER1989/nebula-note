import './index.styl';
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export type ScrollBoxProps = {
    children: React.ReactNode;
    styleMode?: 'dark' | 'light';
    step?: number;
};

const ScrollBox = ({ children, styleMode = 'light', step = 200 }: ScrollBoxProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const [offsetX, setOffsetX] = useState(0);
    const maxScrollRef = useRef(0);
    const [isContentOverflow, setIsContentOverflow] = useState(false);

    const updateScrollLimits = () => {
        if (containerRef.current && contentRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            const contentWidth = contentRef.current.scrollWidth;
            maxScrollRef.current = contentWidth - containerWidth;
            setIsContentOverflow(maxScrollRef.current > 0);
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

    const translateHandle = (direction: 'prev' | 'next') => {
        const delta = direction === 'prev' ? step : 0 - step; // 每次移动的距离
        setOffsetX((prev) => Math.max(0, Math.min(maxScrollRef.current, prev + delta)));
    };

    const contentClass = classNames('nebula-scroll-box-content', styleMode);

    return (
        <div className='nebula-scroll-box'>
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
            {isContentOverflow && (
                <div
                    className='scroll-box-nav prev'
                    onClick={() => translateHandle('prev')}
                >
                    <FiChevronLeft size='20' color='#ffffff' />
                </div>
            )}
            {isContentOverflow && (
                <div
                    className='scroll-box-nav next'
                    onClick={() => translateHandle('next')}
                >
                    <FiChevronRight size='20' color='#ffffff' />
                </div>
            )}
        </div>
    );
};

export default ScrollBox;
