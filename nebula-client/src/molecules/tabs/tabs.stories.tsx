import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabPane } from './index';

export default {
    title: 'Components/Tabs',
    component: Tabs,
} as Meta;

type Story = StoryObj<typeof Tabs>;

export const Primary: Story = {
    args: {
        children: [
            <TabPane id='first' title='first' key='first'>
                First Panel
            </TabPane>,
            <TabPane id='second' title='second' key='second'>
                Second Panel
            </TabPane>,
        ],
    },
};
