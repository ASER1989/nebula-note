import { Meta, StoryObj } from '@storybook/react';
import FolderView, { FolderViewProps } from './index';
import React, {useState} from "react";

export default {
    title: 'Organisms/FolderView',
    component: FolderView,
    tags: ['autodocs'],
    argTypes: {},
    args: {},
} as Meta<FolderViewProps>;

export type Story = StoryObj<FolderViewProps>;
export const Primary: Story = {
    args: {
        data: [
            { name: 'folder1', path: 'folder1'},
            { name: 'folder2', path: 'folder2'},
            { name: 'folder3', path: 'folder3'},
            { name: 'folder4', path: 'folder4'},
            { name: 'folder5', path: 'folder5'},
            { name: 'folder6', path: 'folder6'},
            { name: 'folder7', path: 'folder7'},
            { name: 'folder8', path: 'folder8'},
        ]
    },
    render: (args) => {
        const [value, setValue] = useState<typeof args.value>(undefined);
        return <FolderView value={value} {...args}  onClick={(item) => setValue(item)}/>;
    },
};
