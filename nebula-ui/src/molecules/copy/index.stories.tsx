import { Meta, StoryObj } from '@storybook/react';
import Copy, { CopyProps } from './index';

export default {
    title: 'Molecules/Copy',
    component: Copy,
    tags: ['autodocs'],
    argTypes: {},
    args: {},
} as Meta<CopyProps>;

export type Story = StoryObj<CopyProps>;
export const Primary: Story = {
    args: {},
};
