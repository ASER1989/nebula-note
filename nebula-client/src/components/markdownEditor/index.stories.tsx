import { Meta, StoryObj } from '@storybook/react';
import MarkdownEditor, { Props } from './uiw';

export default {
    title: 'Components/MarkdownEditor',
    component: MarkdownEditor,
    tags: ['autodocs'],
    argTypes: {},
    args: {},
} as Meta<Props>;

export type Story = StoryObj<Props>;
export const Primary: Story = {
    args: {},
};
