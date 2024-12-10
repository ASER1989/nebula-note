import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import SvgText, { Props } from './index';

export default {
    title: 'Atoms/SvgText',
    component: SvgText,
    tags: ['autodocs'],
    argTypes: {},
    args: {},
    parameters: {
        docs: {
            description: {
                component:
                    'Render text content using SVG to bypass font size limitations. By default, Chrome does not allow font sizes smaller than 12px, but SvgText is not subject to this restriction.',
            },
        },
    },
} as Meta<Props>;

export type Story = StoryObj<Props>;

export const Primary: Story = {
    render: () =>(
      <>
          <SvgText fontSize={5}>hello world</SvgText>
          <SvgText fontSize={6}>hello world</SvgText>
          <SvgText fontSize={7}>hello world</SvgText>
          <SvgText fontSize={8}>hello world</SvgText>
          <SvgText fontSize={9}>hello world</SvgText>
          <SvgText fontSize={10}>hello world</SvgText>
          <SvgText fontSize={15}>hello world</SvgText>
          <SvgText fontSize={20}>hello world</SvgText>
          <SvgText fontSize={25}>hello world</SvgText>
          <SvgText fontSize={30}>hello world</SvgText>
      </>
    ),
};
