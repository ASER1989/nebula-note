import React, { ReactNode } from 'react';

export type StackItemProps = {
    children: ReactNode;
    style?: React.CSSProperties;
    flex?: boolean;
    shrink?: number;
};

export const StackItem = ({ children, style, flex, shrink = 0 }: StackItemProps) => {
    const styleCompose = {
        ...style,
        flexShrink: shrink,
        ...(flex ? { flex: 1 } : {}),
    };

    return <div style={styleCompose}>{children}</div>;
};
