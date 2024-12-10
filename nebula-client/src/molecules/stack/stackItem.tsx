import React, { FC, ReactNode } from 'react';

export type StackItemProps = {
    children: ReactNode;
    style?: React.CSSProperties;
    flex?: boolean;
    shrink?: number;
};

export const StackItem = ({ children, style, flex, shrink = 0 }: StackItemProps) => {
    const styleCompose = {
        ...style,
        'flex-shrink': shrink,
        ...(flex ? { flex: 1 } : {}),
    };

    return <div style={styleCompose}>{children}</div>;
};
