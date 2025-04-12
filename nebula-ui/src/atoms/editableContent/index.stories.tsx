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
    parameters: {
        docs: {
            description: {
                component:
                  'EditableContent 是一个允许用户直接编辑文本内容的组件。它提供了一种简单直观的方式来修改文本，非常适合需要用户输入的应用场景。修改参数面板上的内容，可以获取更好的体验。',
            },
        }
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
        editable:true
    }
};
