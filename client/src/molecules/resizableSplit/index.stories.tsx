import { Meta, StoryObj } from '@storybook/react';
import ResizableSplit from './index';
import React from 'react';

export default {
    title: 'Components/ResizableSplit',
    component: ResizableSplit,
    tags: ['autodocs'],
    argTypes: {
        direction: {
            control: {
                type: 'select',
                options: ['horizontal', 'vertical'],
            },
        },
    },
    args: {
        children: [
            <div key='left' style={{ padding: '20px' }}>
                left
            </div>,
            <div key='left' style={{ padding: '20px' }}>
                right
            </div>,
        ],
    },
    decorators: [
        (Story) => (
            <div
                style={{
                    height: '300px',
                    width: '100%',
                    border: '1px solid #f0f0f0',
                    boxShadow: '0 0 6px 3px #f0f0f0',
                    borderRadius: '5px',
                    overflow: 'hidden',
                }}
            >
                <Story />
            </div>
        ),
    ],
    parameters: {
        docs: {
            description: {
                component:
                    'ResizableSplit can be used to split two components horizontally or vertically.',
            },
        },
    },
} as Meta;

type Story = StoryObj<typeof ResizableSplit>;

export const Horizontal: Story = {
    args: {
        direction: 'horizontal',
    },
};

export const Vertical = {
    args: {
        direction: 'vertical',
        children: [
            <div key='top' style={{ padding: '20px' }}>
                top
            </div>,
            <div key='bottom' style={{ padding: '20px' }}>
                bottom
            </div>,
        ],
    },
};
