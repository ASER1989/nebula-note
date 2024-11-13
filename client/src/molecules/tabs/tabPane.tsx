import React from 'react';

export type TabPaneProps = {
    id?: string;
    title: string;
    removable?: boolean;
    children: React.ReactNode | Array<React.ReactNode>;
};
const TabPane = ({ children }: TabPaneProps) => {
    return children;
};

export default TabPane;
