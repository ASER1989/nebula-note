import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { FaPlayCircle } from 'react-icons/fa';
import IconButton, { IconButtonProps } from './index';

export default {
    title: 'Atoms/IconButton',
    component: IconButton,
    tags: ['autodocs'],
    argTypes: {},
    args: {},
} as Meta<IconButtonProps>;

export type Story = StoryObj<IconButtonProps>;
export const Primary: Story = {
    args: {
        children: <FaPlayCircle size={26} color='orange' />,
    },
};
