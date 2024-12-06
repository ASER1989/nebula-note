import React, { FC, ReactNode } from 'react';

export type StackItemProps = {
    children: ReactNode;
    style?: React.CSSProperties;
    flex?: boolean;
};

export const StackItem: FC<StackItemProps> = ({ children, style, flex }) => {
    return <div style={{ ...style, flex: flex ? 1 : undefined }}>{children}</div>;
};
