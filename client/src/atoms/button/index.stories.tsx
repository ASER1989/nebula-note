import { Meta, StoryObj } from '@storybook/react';
import Button, { Props } from './index';

export default {
    title: 'Atoms/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {},
    args: {},
} as Meta<Props>;

export type Story = StoryObj<Props>;
export const Primary: Story = {
    args: {
        children: 'Button',
        type: 'primary',
    },
};
