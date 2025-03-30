import React from 'react';
import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import Checkbox, { CheckboxProps } from './index';

export default {
    title: 'Atoms/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
    argTypes: {},
    args: {
        label: 'Test',
    },
} as Meta<CheckboxProps>;

export type Story = StoryObj<CheckboxProps>;
export const Primary: Story = {
    args: {},
    render: (args) => {
        const [, updateArgs] = useArgs();
        const handleChange = (value: boolean) => {
            updateArgs({ value });
        };
        return <Checkbox {...args} onChange={handleChange} />;
    },
};
