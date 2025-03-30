import { Meta, StoryObj } from '@storybook/react';
import SwitchButton, { SwitchButtonProps } from './index';
import { action } from '@storybook/addon-actions';

export default {
    title: 'Atoms/SwitchButton',
    component: SwitchButton,
    tags: ['autodocs'],
    argTypes: {},
    args: {},
} as Meta<SwitchButtonProps>;

export type Story = StoryObj<SwitchButtonProps>;
export const Primary: Story = {
    args: {
        onChange: action('Switch changed'),
    },
};
