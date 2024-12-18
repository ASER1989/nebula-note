import { Meta, StoryObj } from '@storybook/react';
import Breadcrumb, { BreadcrumbProps } from './index';

export default {
    title: 'Molecules/Breadcrumb',
    component: Breadcrumb,
    tags: ['autodocs'],
    argTypes: {},
    args: {},
} as Meta<BreadcrumbProps>;

export type Story = StoryObj<BreadcrumbProps>;
export const Primary: Story = {
    args: {
        items: [
            {
                label: 'Home',
                path: '/',
            },
            {
                label: 'About',
                path: '/about',
            },
            {
                label: 'Contact',
                path: '/contact',
            },
        ],
    },
};
