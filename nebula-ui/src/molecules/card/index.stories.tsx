import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import ScrollView from '../scrollView';
import Card, { CardProps } from './index';

export default {
    title: 'Molecules/Card',
    component: Card,
    tags: ['autodocs'],
    argTypes: {
        title: {
            control: 'text',
            description: 'The title of the card.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' },
            },
        },
        children: {
            control: 'none' as never,
            description: 'The content of the card.',
            table: {
                type: { summary: 'ReactNode' },
            },
        },
    },
    args: {},
} as Meta<CardProps>;

export type Story = StoryObj<CardProps>;
export const Primary: Story = {
    args: {
        title: 'Card Title',
        children: (
            <p>
                This is the content of the card.his is the content of the card.his is the
                content of the card.his is the content of the card.his is the content of
                the card.his is the content of the card.his is the content of the card.his
                is the content of the card.his is the content of the card.his is the
                content of the card.his is the content of the card.his is the content of
                the card.his is the content of the card.his is the content of the card.his
                is the content of the card.his is the content of the card.his is the
                content of the card.his is the content of the card.his is the content of
                the card.his is the content of the card.his is the content of the card.his
                is the content of the card.
            </p>
        ),
    },
};

export const Scrollable: Story = {
    parameters: {
        docs: {
            description: {
                story: 'This is a story about scrollable card.',
            },
        },
    },
    args: {
        title: 'Scrollable',
        children: (
            <ScrollView height={200} scrollY scrollX>
                <div style={{ width: '150%' }}>
                    This is the content of the card.his is the content of the card.his is
                    the content of the card.his is the content of the card.his is the
                    content of the card.his is the content of the card.his is the content
                    of the card.his is the content of the card.his is the content of the
                    card.his is the content of the card.his is the content of the card.his
                    is the content of the card.his is the content of the card.his is the
                    content of the card.his is the content of the card.his is the content
                    of the card.his is the content of the card.his is the content of the
                    card.his is the content of the card.his is the content of the card.his
                    is the content of the card.his is the content of the card. This is the
                    content of the card.his is the content of the card.his is the content
                    of the card.his is the content of the card.his is the content of the
                    card.his is the content of the card.his is the content of the card.his
                    is the content of the card.his is the content of the card.his is the
                    content of the card.his is the content of the card.his is the content
                    of the card.his is the content of the card.his is the content of the
                    card.his is the content of the card.his is the content of the card.his
                    is the content of the card.his is the content of the card.his is the
                    content of the card.his is the content of the card.his is the content
                    of the card.his is the content of the card.
                </div>
            </ScrollView>
        ),
    },
};
