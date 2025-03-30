import React from 'react';
import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import ExpandBox, { ExpandBoxProps } from './index';

export default {
    title: 'Atoms/ExpandBox',
    component: ExpandBox,
    tags: ['autodocs'],
    argTypes: {},
    args: {},
} as Meta<ExpandBoxProps>;

export type Story = StoryObj<ExpandBoxProps>;
export const Primary: Story = {
    args: {},
    render: (args) => {
        const [, updateArgs] = useArgs();
        const handleChange = (value: boolean) => {
            updateArgs({ value });
        };
        return <ExpandBox {...args} onChange={handleChange} />;
    },
};
