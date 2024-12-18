import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import HighLight, { HighLightProps } from './index';

export default {
    title: 'Atoms/HighLight',
    component: HighLight,
    tags: ['autodocs'],
    argTypes: {},
    args: {},
} as Meta<HighLightProps>;

export type Story = StoryObj<HighLightProps>;
export const Primary: Story = {
    args: {
        keywords: 'TypeScript',
        children:
            'This allows you to avoid the TypeScript error and still expose only the necessary functionality to the parent component.',
        id: 'ex1',
        focusId: 'ex1',
    },
    render: (args) => {
        return (
            <div>
                <HighLight {...args} />
                <HighLight {...args} id='ex_2'>
                    With this change, TypeScript should no longer throw the error because
                    you are now returning a proper DOMRect object (or a fallback) rather
                    than an object that lacks required properties like toJSON.
                </HighLight>
            </div>
        );
    },
};
