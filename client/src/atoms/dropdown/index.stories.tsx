import {Meta, StoryObj} from '@storybook/react';
import Dropdown, {Props} from './index';

export default {
  title: 'Atoms/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes:{},
  args:{
    options: [
      {
        value: '1',
        label: 'Option 1',
        keyword: '1',
      },
      {
        value: '2',
        label: 'Option 2',
        keyword: '2',
      },
      {
        value: '3',
        label: 'Option 3',
        keyword: '3',
      },
      {
        value: '4',
        label: 'Option 4',
        keyword:'4',
      }
    ]
  },
} as Meta<Props> ;

export type Story = StoryObj<Props>
export const Primary: Story = {
  args: {},
}
