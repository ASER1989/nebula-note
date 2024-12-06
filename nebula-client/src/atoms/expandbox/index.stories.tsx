import React from 'react';
import { useArgs } from '@storybook/addons';
import { Meta, StoryObj } from '@storybook/react';
import ExpandBox, { Props } from './index';

export default {
    title: 'Atoms/ExpandBox',
    component: ExpandBox,
    tags: ['autodocs'],
    argTypes: {},
    args: {},
} as Meta<Props>;

export type Story = StoryObj<Props>;
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
