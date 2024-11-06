import React from "react";
import {Meta, StoryObj} from '@storybook/react';
import type {StackProps} from './index';
import {Stack, StackItem} from './index';

export default {
  title: 'Molecules/Stack',
  component: Stack,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} as Meta<StackProps>;

export type Story = StoryObj<StackProps>
export const Primary: Story = {
  args: {
    direction:'row'
  },
  render: (args) => {
    return (
      <Stack {...args}>
        <StackItem>1</StackItem>
        <StackItem>2</StackItem>
      </Stack>
    )
  }
}
