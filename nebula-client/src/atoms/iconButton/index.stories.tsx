import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { FaPlayCircle } from 'react-icons/fa';
import IconButton, { Props } from './index';

export default {
    title: 'Atoms/IconButton',
    component: IconButton,
    tags: ['autodocs'],
    argTypes: {},
    args: {},
} as Meta<Props>;

export type Story = StoryObj<Props>;
export const Primary: Story = {
    args: {
        children: <FaPlayCircle size={26} color='orange' />,
    },
};
