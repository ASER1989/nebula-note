import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { TabPane, Tabs } from './index';

export default {
    title: 'Molecules/Tabs',
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
