import React, {useRef} from 'react';
import {Meta, StoryObj} from '@storybook/react';
import ResizeBox, {ResizableBoxProps} from './index';

export default {
  title: 'Molecules/ResizeBox',
  component: ResizeBox,
  tags: ['autodocs'],

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
    const anchorRef = useRef<HTMLDivElement>(null);
    return (<ResizeBox anchor={anchorRef} right top left bottom initialWidth={100} initialHeight={100}>{
      (style) => (
        <div style={{height:300,display:'flex',alignItems:"center", justifyContent:'space-around'}}>
          <div style={{border:'solid 1px red', ...style}} ref={anchorRef}>

          </div>
        </div>)
    }</ResizeBox>)
  }
}
