import React from 'react';
import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import Button from '@ui/atoms/button';
import Input from '@ui/atoms/input';
import Form, { FormItem } from '@ui/molecules/form';
import { Stack, StackItem } from '@ui/molecules/stack';
import Dialog, { DialogProps } from './index';


const meta = {
    title: 'Molecules/Dialog',
    component: Dialog,
    tags: ['autodocs'],
    argTypes: {},
    args: {
        visible: true,
    },
    parameters: {
        docs: {
            description: {
                component:
                    'Dialog 是一个用于显示重要信息或请求用户输入的模态窗口。它可以覆盖页面的其他内容，确保用户关注对话框中的信息。Dialog 组件可以包含标题、内容和操作按钮，提供灵活的配置选项。',
            },
        },
    },
    decorators: [
        (Story) => (
            <div style={{ width: '100%', minHeight: '200px' }}>
                <Story />
            </div>
        ),
    ],
} as Meta<DialogProps>;

export default meta;

export type Story = StoryObj<DialogProps>;
export const Primary: Story = {
    name: '简单示例',
    parameters: {
        docs: {
            description: {
                story: 'Dialog是一个完全受控的组件，并且Dialog支持使用Esc关闭功能',
            },
        },
    },
    args: {
        title: '简单示例',
    },
    render: (args) => {
        const [, updateArgs] = useArgs();
        const handleClose = () => {
            updateArgs({ visible: false });
        };
        const handleOpen = () => {
            updateArgs({ visible: true });
        };
        return (
            <>
                <Button type={args.visible ? 'default' : 'primary'} onClick={handleOpen}>
                    Open Dialog
                </Button>
                <Dialog {...args} onClose={handleClose}>
                    <div
                        style={{
                            width: '230px',
                            height: '60px',
                            backgroundColor: 'white',
                            padding: 10,
                        }}
                    >
                        message content!
                    </div>
                </Dialog>
            </>
        );
    },
};

export const Secondary: Story = {
    name: '表单示例',
    parameters: {
        docs: {
            description: {
                story: 'Dialog的Children可以是任何React元素',
            },
        },
    },
    decorators: [
        (Story) => (
            <div style={{ minHeight: '500px' }}>
                <Story />
            </div>
        ),
    ],
    render: (args) => {
        const [, updateArgs] = useArgs();
        const handleClose = () => {
            updateArgs({ visible: false });
        };
        const handleOpen = () => {
            updateArgs({ visible: true });
        };
        return (
            <>
                <Button type={args.visible ? 'default' : 'primary'} onClick={handleOpen}>
                    Open Dialog
                </Button>
                <Dialog {...args} onClose={handleClose}>
                    <div
                        style={{
                            width: '330px',
                            height: '139px',
                            backgroundColor: 'white',
                            padding: 10,
                        }}
                    >
                        <Form>
                            <FormItem label='姓名'>
                                <Input placeholder='Name' />
                            </FormItem>
                            <FormItem label='城市'>
                                <Input placeholder='Name' />
                            </FormItem>
                            <FormItem>
                                <Stack justify={'center'} spacing={20}>
                                    <StackItem>
                                        <Button type='default' onClick={handleClose}>
                                            取消
                                        </Button>
                                    </StackItem>
                                    <StackItem>
                                        <Button type='primary' onClick={handleClose}>
                                            保存
                                        </Button>
                                    </StackItem>
                                </Stack>
                            </FormItem>
                        </Form>
                    </div>
                </Dialog>
            </>
        );
    },
};
