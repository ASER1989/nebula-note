import {Meta, StoryObj} from '@storybook/react';
import ResizableSplit from './index';
import React from 'react';

export default {
  title: 'Components/ResizableSplit',
  component: ResizableSplit,
  argTypes: {
    direction: {
      control: {
        type: 'select',
        options: ['horizontal', 'vertical'],
      },
    },
  },
  args: {
    children: [<div key='left'>left</div>, <div key='left'>right</div>]
  },
  decorators: [
    (Story) => (
      <div style={{height: 'calc(100vh - 2rem)', width: 'calc(100vw - 2rem)'}}>
        <Story/>
      </div>
    ),
  ],
} as Meta;

type Story = StoryObj<typeof ResizableSplit>

export const Horizontal: Story = {
  args: {
    direction: 'horizontal',
    children: [<div key='left'>left</div>, <div key='left'>right</div>]
  }
};

export const Vertical = {
  args: {
    direction: 'vertical',
    children: [<div key='left'>top</div>, <div key='left'>bottom</div>]
  }
};
