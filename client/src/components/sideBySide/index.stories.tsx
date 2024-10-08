import {Meta, StoryObj} from '@storybook/react';
import ResizableSplit from './index';

export default {
  title: 'Components/SideBySide',
  component: ResizableSplit,
} as Meta;

type Story = StoryObj<typeof ResizableSplit>

export const Primary: Story = {
  args: {
    children: 'left',
    extendChild:'right'
  }
};
