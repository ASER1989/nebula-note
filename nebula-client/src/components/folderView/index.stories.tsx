import {Meta, StoryObj} from '@storybook/react';
import FolderView, {Props} from './index';

export default {
    title: 'Components/FolderPicker',
    component: FolderView,
    tags: ['autodocs'],
    argTypes:{},
    args:{},
} as Meta<Props> ;

export type Story = StoryObj<Props>
export const Primary: Story = {
    args: {},
}