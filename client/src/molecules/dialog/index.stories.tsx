import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/addons';
import Dialog, { Props } from './index';

const meta = {
    title: 'Molecules/Dialog',
    component: Dialog,
    tags: ['autodocs'],
    argTypes: {},
    args: {
        visible: true,
    },
    decorators: [
        (Story) => (
            <div style={{ width: '100%', height: '200px' }}>
                <Story />
            </div>
        ),
    ],
} as Meta<Props>;

export default meta;

export type Story = StoryObj<Props>;
export const Primary: Story = {
    args: {
        children: (
            <div
                style={{
                    width: '230px',
                    height: '60px',
                    backgroundColor: 'white',
                    padding: 10,
                }}
            >
                message content!
            </div>
        ),
    },
    render: (args) => {
        const [, updateArgs] = useArgs();
        const handleClose = () => {
            updateArgs({ visible: false });
        };
        return <Dialog {...args} onClose={handleClose} />;
    },
};
