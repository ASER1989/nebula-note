import { Meta, StoryObj } from '@storybook/react';
import Switch, { SwitchProps } from './index';

export default {
    title: 'Atoms/Switch',
    component: Switch,
    tags: ['autodocs'],
    argTypes: {},
    args: {},
} as Meta<SwitchProps>;

export type Story = StoryObj<SwitchProps>;
export const Primary: Story = {
    args: {},
};
