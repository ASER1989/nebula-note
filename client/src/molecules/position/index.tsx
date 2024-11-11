import React, { useMemo } from 'react';

export type Props = {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    className?: string;
    type?: 'absolute' | 'fixed' | 'relative' | 'static' | 'sticky';
};

export const Position = (props: Props) => {
    const { className } = props;
    const style = useMemo(() => {
        return {
            top: props.top,
            left: props.left,
            right: props.right,
            bottom: props.bottom,
            position: props.type,
            ...props.style,
        };
    }, [props]);
    return (
        <div className={className} style={style}>
            {props.children}
        </div>
    );
};

export default Position;
