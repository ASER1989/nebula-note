import React, { useMemo } from 'react';

export type PositionProps = {
    top?: number | string;
    left?: number | string;
    right?: number | string;
    bottom?: number | string;
    zIndex?: number;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    className?: string;
    type?: 'absolute' | 'fixed' | 'relative' | 'static' | 'sticky';
    ['data-test-id']?: string;
};

export const PositionBase = (
    props: PositionProps,
    ref: React.ForwardedRef<HTMLDivElement>,
) => {
    const { className } = props;
    const style = useMemo(() => {
        return {
            top: props.top,
            left: props.left,
            right: props.right,
            bottom: props.bottom,
            position: props.type,
            zIndex: props.zIndex,
            fontSize: 0,
            ...props.style,
        };
    }, [props]);
    return (
        <div ref={ref} className={className} style={style} data-test-id={props['data-test-id']}>
            {props.children}
        </div>
    );
};
PositionBase.displayName = 'Position';
export const Position = React.forwardRef(PositionBase);
export default Position;
