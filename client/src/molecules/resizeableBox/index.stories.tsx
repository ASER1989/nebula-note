import React, {useRef} from 'react';
import {Meta, StoryObj} from '@storybook/react';
import ResizeBox, {ResizableBoxProps} from './index';
import {useArgs} from "@storybook/addons";

export default {
  title: 'Molecules/ResizeBox',
  component: ResizeBox,
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'children',
      control: {
        type: 'text'
      }
    },
    initialHeight: {
      description: 'initialHeight',
      control: {
        type: 'number'
      }
    },
    initialWidth: {
      description: 'initialWidth',
      control: {
        type: 'number'
      }
    },
    top: {
      description: 'top',
      control: {
        type: 'boolean'
      }
    },
    bottom: {
      description: 'bottom',
      control: {
        type: 'boolean'
      }
    },
    left: {
      description: 'left',
      control: {
        type: 'boolean'
      }
    },
    right: {
      description: 'right',
      control: {
        type: 'boolean'
      }
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'ResizeBox'
      }
    }
  }
} as Meta<ResizableBoxProps>;

export type Story = StoryObj<ResizableBoxProps>
export const Primary: Story = {
  args: {
    right:true,
    left:true,
    bottom:true,
    top:true,
    initialHeight:100,
    initialWidth:100
  },
  render: () => {
    const [args, ] =useArgs()
    const anchorRef = useRef<HTMLDivElement>(null);
    return (<ResizeBox {...args} anchor={anchorRef} >{
      (style) => (
        <div style={{height:300,display:'flex',alignItems:"center", justifyContent:'space-around'}}>
          <div style={{border:'solid 1px red', ...style}} ref={anchorRef}>

          </div>
        </div>)
    }</ResizeBox>)
  }
}
