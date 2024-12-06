import { Meta, StoryObj } from '@storybook/react';
import Textarea, { Props } from './index';

export default {
    title: 'Atoms/Textarea',
    component: Textarea,
    tags: ['autodocs'],
    argTypes: {},
    args: {},
} as Meta<Props<string>>;

export type Story = StoryObj<Props<string>>;
export const Primary: Story = {
    args: {},
};
