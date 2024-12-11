import React, { useEffect } from 'react';
import { useArgs } from '@storybook/addons';
import { Meta, StoryObj } from '@storybook/react';
import Dropdown, { DropdownProps } from './dropdown';

export default {
    title: 'Atoms/Dropdown',
    component: Dropdown,
    tags: ['autodocs'],
    argTypes: {
        options: {
            description: 'Options to be displayed in the dropdown',
            table: {
                type: {
                    summary: 'Array<{value: string, label: string, keyword?: string}>',
                },
            },
            control: {
                type: 'object',
            },
        },
        enableTags: {
            description: 'Tags to be displayed in the dropdown',
            table: {
                type: {
                    summary: 'Array<{tag: string, color: string}>',
                },
            },
            control: {
                type: 'object',
            },
        },
        size: {
            description: 'Size of the dropdown',
            table: {
                type: {
                    summary: 'default | tiny | small',
                },
            },
            control: {
                type: 'radio',
            },
            options: ['default', 'tiny', 'small'],
        },
        value: {
            description: 'Value of the dropdown',
            table: {
                type: {
                    summary: 'string',
                },
            },
            control: {
                type: 'text',
            },
        },
        themeColor: {
            description: 'Color of the dropdown',
            table: {
                type: {
                    summary: 'string',
                },
            },
            control: {
                type: 'color',
            },
        },
        placeholder: {
            description: 'Placeholder of the dropdown',
            table: {
                type: {
                    summary: 'string',
                },
            },
            control: {
                type: 'text',
            },
        },
        disabled: {
            description: 'Whether the dropdown is disabled',
            table: {
                type: {
                    summary: 'boolean',
                },
            },
            control: {
                type: 'boolean',
            },
        },
    },
    args: {
        options: [],
    },
    parameters: {
        docs: {
            description: {
                component:
                    'An interesting dropdown component that supports keyword filtering, coloring, and other features. Simple and easy to use.',
            },
        },
    },
    decorators: [
        (Story) => (
            <div
                style={{
                    height: '200px',
                }}
            >
                <Story />
            </div>
        ),
    ],
} as Meta<DropdownProps<string>>;

export type Story = StoryObj<DropdownProps<string>>;
export const Primary: Story = {
    args: {
        enableTags: [
            {
                tag: 'two',
                color: '#ff0000',
            },
            {
                tag: 'four',
                color: 'orange',
            },
        ],
        options: [],
    },
    render: () => {
        const options = [
            {
                value: '1',
                label: 'Option one',
                keyword: '1',
            },
            {
                value: '2',
                label: 'Option two',
                keyword: '2',
            },
            {
                value: '3',
                label: 'Option three',
                keyword: '3',
            },
            {
                value: '4',
                label: 'Option four',
                keyword: '4',
            },
        ];
        const [args, updateArgs] = useArgs<DropdownProps<string>>();
        useEffect(() => {
            updateArgs({ options: options });
        }, []);
        const handleSearch = (keyword?: string) => {
            if (keyword) {
                const newOptions = options.filter((option) =>
                    option.label?.includes(keyword),
                );
                updateArgs({ options: newOptions });
            } else {
                updateArgs({ options: options });
            }
        };

        return <Dropdown {...args} onSearch={handleSearch} />;
    },
};
