import React, { useEffect } from 'react';
import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import EditableContent, { EditableContentProps } from './index';

export default {
    title: 'Atoms/EditableContent',
    component: EditableContent,
    tags: ['autodocs'],
    argTypes: {
    },
    args: {
        options: [],
    },
    decorators: [
        (Story) => (
            <div
                style={{
                    height: '200px',
                }}
            >
                <Story />
            </div>
        ),
    ],
} as Meta<EditableContentProps>;

export type Story = StoryObj<EditableContentProps>;
export const Primary: Story = {
    args: {
        children:"Edit the content, update the arguments, and click to modify the content.",
    }
};
