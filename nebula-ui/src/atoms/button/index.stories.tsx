import { Meta, StoryObj } from '@storybook/react';
import Button, { ButtonProps } from './index';
import { action } from '@storybook/addon-actions';

export default {
    title: 'Atoms/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {},
    args: {},
} as Meta<ButtonProps>;

export type Story = StoryObj<ButtonProps>;
export const Primary: Story = {
    args: {
        children: 'Button',
        type: 'primary',
        onClick: action('Button clicked'),
    },
};
