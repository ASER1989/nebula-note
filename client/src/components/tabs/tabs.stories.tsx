import React from 'react';
import {Meta, StoryObj} from '@storybook/react';
import {Tabs, TabPane} from './index';

export default {
  title: 'Components/Tabs',
  component: Tabs,
  decorators: [
    (Story) => (
      <div style={{height: 'calc(100vh - 2rem)', width: 'calc(100vw - 2rem)'}}>
        <Story/>
      </div>
    ),
  ],
} as Meta;

type Story = StoryObj<typeof Tabs>

export const Primary: Story = {
  args: {
    children: [
      <TabPane id='first' title='first' key='first'>First Panel</TabPane>,
      <TabPane id='second' title='second' key='second'>Second Panel</TabPane>
    ]
  }
};
