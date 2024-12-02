import React from 'react';
import {Meta, StoryObj} from '@storybook/react';
import Switch, {Props} from './index';

export default {
    title: 'Atoms/Switch',
    component: Switch,
    tags: ['autodocs'],
    argTypes:{},
    args:{},
} as Meta<Props> ;

export type Story = StoryObj<Props>
export const Primary: Story = {
    args: {},
}