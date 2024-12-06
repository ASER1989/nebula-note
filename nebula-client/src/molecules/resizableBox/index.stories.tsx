import React, { useRef } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import ResizeBox, { ResizableBoxProps } from './index';
import { useArgs } from '@storybook/addons';

export default {
    title: 'Molecules/ResizeBox',
    component: ResizeBox,
    tags: ['autodocs'],
    argTypes: {
        children: {
            description: 'children',
            control: {
                type: 'text',
            },
        },
        initialHeight: {
            description: 'initialHeight',
            control: {
                type: 'number',
            },
        },
        initialWidth: {
            description: 'initialWidth',
            control: {
                type: 'number',
            },
        },
        top: {
            description: 'top',
            control: {
                type: 'boolean',
            },
        },
        bottom: {
            description: 'bottom',
            control: {
                type: 'boolean',
            },
        },
        left: {
            description: 'left',
            control: {
                type: 'boolean',
            },
        },
        right: {
            description: 'right',
            control: {
                type: 'boolean',
            },
        },
    },
    parameters: {
        docs: {
            description: {
                component: 'ResizeBox',
            },
        },
    },
    decorators: [
        (Story) => (
            <div
                style={{
                    width: '100%',
                    height: '300px',
                }}
            >
                <div style={{ marginBottom: '10px', color: '#797979' }}>
                    Hover over the box and try resizing it:
                </div>

                <Story />
            </div>
        ),
    ],
} as Meta<ResizableBoxProps>;

export type Story = StoryObj<ResizableBoxProps>;
export const Primary: Story = {
    args: {
        right: true,
        left: true,
        bottom: true,
        top: true,
        initialHeight: 100,
        initialWidth: 100,
    },
    render: (args) => {
        const anchorRef = useRef<HTMLDivElement>(null);
        return (
            <ResizeBox {...args} anchor={anchorRef}>
                {(style) => (
                    <div
                        style={{ border: 'solid 1px red', ...style }}
                        ref={anchorRef}
                    ></div>
                )}
            </ResizeBox>
        );
    },
    parameters: {
        docs: {
            source: {
                code: `
import React,{useRef} from 'react';

export default Example = ()=> {
    const anchorRef = useRef<HTMLDivElement>(null);
    return (
        <ResizeBox  initialHeight={100} initialWidth={100} right left bottom top anchor={anchorRef} >
         {(style) => (
            <div
                style={{ border: 'solid 1px red', ...style }}
                ref={anchorRef}
            ></div>
        )}
        </ResizeBox>
    )
}
                    `,
            },
        },
    },
};
