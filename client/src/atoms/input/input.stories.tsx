import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';
import React, {useState} from "react";

import Input from './index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    onChange: {description: "ChangeEvent"},
    value: {description: 'Input value,the type of string / number / undefined', default: 'undefined'},
    border: {description: 'Enable the border of input',table:{defaultValue:{summary:'false'}}}
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {onChange: fn()},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => {

    const [value, setValue] = useState('test value');

    return (
      <div>
        <p>Try to change the value or property</p>
        <Input onChange={(val: string) => setValue(val)} value={value} border={true}/>
      </div>
    );
  }
};
