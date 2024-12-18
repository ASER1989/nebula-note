import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import ScrollBox, { ScrollBoxProps } from './index';

export default {
    title: 'Molecules/ScrollBox',
    component: ScrollBox,
    tags: ['autodocs'],
    argTypes: {},
    args: {},
    parameters: {
        docs: {
            description: {
                component: 'The simplest horizontally scrollable container.Try swiping it.',
            },
        },
    },
} as Meta<ScrollBoxProps>;

export type Story = StoryObj<ScrollBoxProps>;
export const Primary: Story = {
    args: {
        children: (
            <div style={{ height: 50, display: 'flex', gap: 10, color: 'white' }}>
                <div
                    style={{
                        height: 50,
                        width: 100,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'red',
                    }}
                >
                    first
                </div>

                <div
                    style={{
                        height: 50,
                        width: 100,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'blue',
                    }}
                >
                    second
                </div>
                <div
                    style={{
                        height: 50,
                        width: 100,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'green',
                    }}
                >
                    third
                </div>
                <div
                    style={{
                        height: 50,
                        width: 100,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'yellow',
                    }}
                >
                    fourth
                </div>
                <div
                    style={{
                        height: 50,
                        width: 100,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'orange',
                    }}
                >
                    fifth
                </div>
                <div
                    style={{
                        height: 50,
                        width: 100,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'purple',
                    }}
                >
                    sixth
                </div>
                <div
                    style={{
                        height: 50,
                        width: 100,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'pink',
                    }}
                >
                    seventh
                </div>
                <div
                    style={{
                        height: 50,
                        width: 100,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'brown',
                    }}
                >
                    eighth
                </div>
                <div
                    style={{
                        height: 50,
                        width: 100,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'gray',
                    }}
                >
                    ninth
                </div>
                <div
                    style={{
                        height: 50,
                        width: 100,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'black',
                    }}
                >
                    tenth
                </div>
                <div
                    style={{
                        height: 50,
                        width: 100,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'goldenrod',
                    }}
                >
                    eleventh
                </div>
                <div
                    style={{
                        height: 50,
                        width: 100,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'lightblue',
                    }}
                >
                    twelfth
                </div>
                <div
                    style={{
                        height: 50,
                        width: 100,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'lightgreen',
                    }}
                >
                    thirteenth
                </div>
                <div
                    style={{
                        height: 50,
                        width: 100,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'tomato',
                    }}
                >
                    fourteenth
                </div>
                <div
                    style={{
                        height: 50,
                        width: 100,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'lightsalmon',
                    }}
                >
                    fifteenth
                </div>
            </div>
        ),
    },
};
