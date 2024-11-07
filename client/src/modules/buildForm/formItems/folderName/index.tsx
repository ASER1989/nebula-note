import React, { useEffect, useContext } from 'react';
import type { ExtraState, FormState } from '../../types';
import Input from '@client/atoms/input';
import './index.styl';
import FolderTree from '@client/components/folderTree';
import request from '@client/utils/request';
import type { Folder } from '@client/components/folderTree/types';
import { FormItem } from '@client/molecules/form';
import { BuildFormContext } from '../../context';

export default function FolderName() {
    const { formState, setFormState, setExtraState, setExtraRender } =
        useContext(BuildFormContext);
    const setFolderTreeData = (folderTreeData: Folder) => {
        setExtraState?.((ownState) => {
            return {
                ...ownState,
                folderTreeData,
            };
        });
    };

    const handleChange = (val?: string) => {
        setFormState?.((ownState) => {
            return {
                ...ownState,
                folderPath: val,
            };
        });
    };

    useEffect(() => {
        request.get<Folder>('/common/folder').then((resp) => {
            setFolderTreeData(resp.data);
        });
    }, []);

    const handleFolderTreeChange = (folder: Folder) => {
        setFolderTreeData({ ...folder });
    };
    const handleFolderCheck = (folderPath: string, isChecked: boolean) => {
        handleChange(isChecked ? folderPath : undefined);
    };

    const expandRender = ({ folderTreeData }: ExtraState, { folderPath }: FormState) => {
        return (
            <FolderTree
                folder={folderTreeData}
                checkedPath={folderPath}
                onChange={handleFolderTreeChange}
                onCheck={handleFolderCheck}
            />
        );
    };
    const handleModuleNameFocus = () => {
        setExtraRender('folderName', expandRender);
    };

    return (
        <FormItem label='文件路径'>
            <Input
                placeholder='请在右侧选择模块父级文件夹，如：hedge-modules'
                onFocus={handleModuleNameFocus}
                onChange={handleChange}
                value={formState?.folderPath}
            />
        </FormItem>
    );
}
