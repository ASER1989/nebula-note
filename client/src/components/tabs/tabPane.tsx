import React from 'react';

export type TabPaneProps = {
    id: string;
    title: string;
    children: React.ReactNode | Array<React.ReactNode>;
};
const TabPane = ({children}: TabPaneProps) => {
    return children;
};

export default TabPane;
