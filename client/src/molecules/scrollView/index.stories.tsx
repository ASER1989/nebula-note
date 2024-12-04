import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import ScrollView, { type Props } from './index';

export default {
    title: 'Molecules/ScrollView',
    component: ScrollView,
    tags: ['autodocs'],
    argTypes: {
        children: {
            control: 'none' as never,
        }
    },
    args: {},
} as Meta<Props>;

export type Story = StoryObj<Props>;
export const Primary: Story = {
    args: {
        height: 300,
        width: 300,
        scrollY: true,
        children: (
            <div>
                <div style={{background:"linear-gradient(to right,blue,#FFFFFF)", width: 500, height: 100}}></div>
                <div style={{background:"linear-gradient(to right,green,#FFFFFF)", width: 500, height: 100}}></div>
                <div style={{background:"linear-gradient(to right,yellow,#FFFFFF)", width: 500, height: 100}}></div>
                <div style={{background:"linear-gradient(to right,blue,#FFFFFF)", width: 500, height: 100}}></div>
                <div style={{background:"linear-gradient(to right,green,#FFFFFF)", width: 500, height: 100}}></div>
                <div style={{background:"linear-gradient(to right,red,#FFFFFF)", width: 500, height: 100}}></div>
                <div style={{background:"linear-gradient(to right,yellow,#FFFFFF)", width: 500, height: 100}}></div>
                <div style={{background:"linear-gradient(to right,blue,#FFFFFF)", width: 500, height: 100}}></div>
                <div style={{background:"linear-gradient(to right,green,#FFFFFF)", width: 500, height: 100}}></div>
                <div style={{background:"linear-gradient(to right,yellow,#FFFFFF)", width: 500, height: 100}}></div>
                <div style={{background:"linear-gradient(to right,blue,#FFFFFF)", width: 500, height: 100}}></div>
                <div style={{background:"linear-gradient(to right,red,#FFFFFF)", width: 500, height: 100}}></div>
                <div style={{background:"linear-gradient(to right,green,#FFFFFF)", width: 500, height: 100}}></div>
                <div style={{background:"linear-gradient(to right,yellow,#FFFFFF)", width: 500, height: 100}}></div>
            </div>
        ),
    },
};
