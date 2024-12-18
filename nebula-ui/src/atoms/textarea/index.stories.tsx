import { Meta, StoryObj } from '@storybook/react';
import Textarea, { TextareaProps } from './index';

export default {
    title: 'Atoms/Textarea',
    component: Textarea,
    tags: ['autodocs'],
    argTypes: {},
    args: {},
} as Meta<TextareaProps>;

export type Story = StoryObj<TextareaProps>;
export const Primary: Story = {
    args: {},
};
