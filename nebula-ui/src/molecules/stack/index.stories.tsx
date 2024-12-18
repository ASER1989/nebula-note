import React from 'react';
import type { StackProps } from './index';
import { Meta, StoryObj } from '@storybook/react';
import { Stack, StackItem } from './index';

export default {
    title: 'Molecules/Stack',
    component: Stack,
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: 'select',
            options: ['flex', 'inline-flex'],
            table: {
                defaultValue: { summary: 'flex' },
            },
        },
        direction: {
            control: 'select',
            options: ['horizontal', 'vertical'],
        },
        spacing: {
            control: 'number',
        },
        align: {
            control: 'select',
            options: ['stretch', 'center', 'flex-start', 'flex-end'],
        },
        justify: {
            control: 'select',
            options: [
                'flex-start',
                'center',
                'space-between',
                'space-around',
                'flex-end',
            ],
        },
        overflow: {
            control: 'select',
            options: ['auto', 'hidden'],
            table: {
                defaultValue: { summary: 'hidden' },
            },
        },
        children: {
            control: false,
        },
    },
    args: {
        type: 'flex',
        direction: 'horizontal',
    },
    parameters: {
        docs: {
            description: {
                component: 'Used for quickly implementing flex layouts.',
            },
        },
    },
} as Meta<StackProps>;

export type Story = StoryObj<StackProps>;
export const Primary: Story = {
    args: {
        direction: 'horizontal',
        justify: 'space-around',
    },
    render: (args) => {
        return (
            <Stack {...args}>
                <StackItem>first</StackItem>
                <StackItem>second</StackItem>
                <StackItem>third</StackItem>
            </Stack>
        );
    },
};
