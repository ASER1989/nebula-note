import {Meta, StoryObj} from '@storybook/react';
import SvgText, {Props} from './index';

export default {
  title: 'Atoms/SvgText',
  component: SvgText,
  tags: ['autodocs'],
  argTypes:{},
  args:{},
  parameters: {
    docs: {
      description: {
        component: 'Render text content using SVG to bypass font size limitations. By default, Chrome does not allow font sizes smaller than 12px, but SvgText is not subject to this restriction.',
      },
    },
  },
} as Meta<Props> ;

export type Story = StoryObj<Props>
export const Primary: Story = {
  args: {
    children:'hello',
    fontSize:10
  },
}
