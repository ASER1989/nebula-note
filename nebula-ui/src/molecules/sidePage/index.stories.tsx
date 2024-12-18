import React from 'react';
import type { SidePageProps } from './index';
import { Meta, StoryObj } from '@storybook/react';
import { SidePage } from './index';

export default {
    title: 'Molecules/SidePage',
    component: SidePage,
    tags: ['autodocs'],
    argTypes: {},
    args: {},
    decorators: [
        (Story) => {
            return (
                <div style={{ height: 300 }}>
                    <Story />
                </div>
            );
        },
    ],
} as Meta<SidePageProps>;

export type Story = StoryObj<SidePageProps>;
export const Primary: Story = {
    args: {
        visible: true,
        title: 'Example',
        showTitle: true,
        children: <div style={{ height: 300, backgroundColor: 'orange' }}></div>,
    },
    render: (props) => {
        return <SidePage {...props} onVisibleChange={() => (props.visible = false)} />;
    },
};
