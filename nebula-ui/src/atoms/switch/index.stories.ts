import { Meta, StoryObj } from '@storybook/react';
import Switch, { SwitchProps } from './index';
import { action } from '@storybook/addon-actions';

export default {
    title: 'Atoms/Switch',
    component: Switch,
    tags: ['autodocs'],
    argTypes: {},
    args: {},
} as Meta<SwitchProps>;

export type Story = StoryObj<SwitchProps>;
export const Primary: Story = {
    args: {
        onChange: action('Switch changed'),
    },
};
