import React, { ForwardedRef, useEffect, useImperativeHandle, useRef } from 'react';

export type Props = {
    width?: string | number;
    height?: string | number;
    scrollX?: boolean;
    scrollY?: boolean;
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactNode;
    ['data-test-id']?: string;
};

const ScrollViewBase = (
    {
        width = '100%',
        height = '100%',
        scrollX = false,
        scrollY = false,
        className,
        style,
        children,
        'data-test-id': dataTestId,
    }: Props,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    const scrollViewRef = useRef<HTMLDivElement>(null);

    const scrollViewStyle: React.CSSProperties = {
        width,
        height,
        overflowX: scrollX ? 'auto' : 'hidden',
        overflowY: scrollY ? 'auto' : 'hidden',
        ...style,
    };

    useImperativeHandle(ref, () => scrollViewRef.current!, [scrollViewRef.current]);

    useEffect(() => {
        if (scrollViewRef.current) {
            const hasHorizontalScrollbar =
                scrollViewRef.current.scrollWidth > scrollViewRef.current.clientWidth;
            const hasVerticalScrollbar =
                scrollViewRef.current.scrollHeight > scrollViewRef.current.clientHeight;

            const computedStyle = window.getComputedStyle(scrollViewRef.current);
            if (hasVerticalScrollbar) {
                scrollViewRef.current.style.paddingRight = `calc(${computedStyle.paddingRight} - var(--scroll-width)`;
            }
            if (hasHorizontalScrollbar) {
                scrollViewRef.current.style.paddingBottom = `calc(${computedStyle.paddingBottom} - var(--scroll-width)`;
            }
        }
    }, [scrollViewRef]);

    return (
        <div
            className={className}
            style={scrollViewStyle}
            ref={scrollViewRef}
            data-test-id={dataTestId}
        >
            {children}
        </div>
    );
};

export const ScrollView = React.forwardRef(ScrollViewBase);
export default ScrollView;
