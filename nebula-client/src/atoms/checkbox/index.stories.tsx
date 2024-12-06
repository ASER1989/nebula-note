import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Checkbox, { Props } from './index';
import { useArgs } from '@storybook/addons';

export default {
    title: 'Atoms/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
    argTypes: {},
    args: {
        label: 'Test',
    },
} as Meta<Props>;

export type Story = StoryObj<Props>;
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
