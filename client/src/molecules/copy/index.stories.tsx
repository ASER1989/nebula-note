import {Meta, StoryObj} from '@storybook/react';
import Copy, {Props} from './index';

export default {
  title: 'Molecules/Copy',
  component: Copy,
  tags: ['autodocs'],
  argTypes:{},
  args:{},
} as Meta<Props> ;

export type Story = StoryObj<Props>
export const Primary: Story = {
  args: {},
}
