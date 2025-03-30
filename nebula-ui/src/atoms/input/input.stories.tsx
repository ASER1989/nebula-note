import React, { ChangeEvent, useEffect, useState } from 'react';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within,queryByAttribute } from '@storybook/test';
import Input from './index';

// import {expect} from '@storybook/jest';

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
        border: {
            control: 'boolean',
            description: 'Enable the input border.',
            table: { defaultValue: { summary: 'false' } },
        },
        value: { control: 'text', description: 'The input content' },
        placeholder: {
            control: 'text',
            table: { defaultValue: { summary: 'undefined' } },
        },
        size: {
            control: 'select',
            options: ['tiny', 'small', 'medium', 'large'],
            description: 'The input size.',
            table: { defaultValue: { summary: 'medium' } },
        },
    },
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    args: {
        onChange: action('onChange'),
        onFocus: action('onFocus'),
        border: true,
        size: 'medium',
    },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof Input>;

export const Primary: Story = {
    render: (args) => {
        const { border, placeholder, light, onFocus, onChange, size } = args;

        const [value, setValue] = useState<typeof args.value>(args.value ?? 'test value');

        useEffect(() => {
            if (value !== args.value) {
                setValue(args.value ?? undefined);
            }
        }, [args.value]);
        const handleChange = (
            newVal: string,
            e?: ChangeEvent<HTMLInputElement>,
        ) => {
            setValue(newVal);
            onChange?.(newVal,e);
        };
        return (
            <div>
                <p>Try to changing the value or property</p>
                <Input
                    onChange={handleChange}
                    value={value}
                    border={border}
                    light={light}
                    size={size}
                    placeholder={placeholder}
                    onFocus={onFocus}
                />
            </div>
        );
    },
};

export const Secondary: Story = {
    args: {
        'data-test-id': 'input-test',
        onChange: action('onChange'),
    },
    play: async ({ canvasElement }) => {
        const inputEl = queryByAttribute('data-test-id',canvasElement,'input-test');
        if (!inputEl) {
            throw new Error('Input element not found');
        }
        await userEvent.type(inputEl, 'hello world');
        await expect(inputEl).toHaveValue('hello world');
    },
};
