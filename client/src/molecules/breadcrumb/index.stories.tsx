import React from 'react';
import {Meta, StoryObj} from '@storybook/react';
import Breadcrumb, {Props} from './index';

export default {
    title: 'Molecules/Breadcrumb',
    component: Breadcrumb,
    tags: ['autodocs'],
    argTypes:{},
    args:{},
} as Meta<Props> ;

export type Story = StoryObj<Props>
export const Primary: Story = {
    args: {
        items:[
            {
                label: 'Home',
                href: '/'
            },
            {
                label: 'About',
                href: '/about'
            },
            {
                label: 'Contact',
                href: '/contact'
            },
        ]
    },
}