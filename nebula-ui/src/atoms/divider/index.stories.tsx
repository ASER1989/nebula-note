import { Meta, StoryObj } from '@storybook/react';
import Divider , { DividerProps } from './index';
import React from "react";

export default {
    title: 'Atoms/Divider',
    component: Divider,
    tags: ['autodocs'],
    argTypes: {
        height: {
            control: {
                type: 'number',
            },
        },
        width: {
            control: {
                type: 'number',
            },
        },
    },
    args: {},
    decorators: [
        (Story) => {
            return (
              <div style={{ height: 100 }}>
            <Story />
            </div>
        );
        },
    ],
} as Meta<DividerProps>;

export type Story = StoryObj<DividerProps>;
export const Primary: Story = {
    args: {
        type: 'horizontal',
        color: '#777',
    },

};
