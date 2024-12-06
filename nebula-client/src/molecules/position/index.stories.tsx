import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Position, { Props } from './index';

export default {
    title: 'Molecules/Position',
    component: Position,
    tags: ['autodocs'],
    argTypes: {},
    args: {},
    decorators: [
        (Story) => (
            <div style={{ height: '300px', overflow: 'auto' }}>
                <div style={{ height: '500px', position: 'relative' }}>
                    <Story />
                </div>
            </div>
        ),
    ],
} as Meta<Props>;

export type Story = StoryObj<Props>;
export const Primary: Story = {
    args: {
        right: 50,
        type: 'fixed',
        children: (
            <div style={{ background: 'red', width: '100px', height: '100px' }}>
                position
            </div>
        ),
    },
};
