import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import type { StackProps } from './index';
import { Stack, StackItem } from './index';

export default {
    title: 'Molecules/Stack',
    component: Stack,
    tags: ['autodocs'],
    argTypes: {},
    args: {},
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
        direction: 'row',
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
