import React, { useMemo, useState, useRef } from 'react';
import Dialog from '@client/molecules/dialog';
import ScrollView from '@client/molecules/scrollView';
import ResizableBox from '@client/molecules/resizableBox';
import FolderView from '@client/components/folderView';
import { Stack, StackItem } from '@client/molecules/stack';
import Button from '@client/atoms/button';
import useFolderPicker from '@client/models/folderPickerModel/useFolderPicker';
import Breadcrumb, { BreadcrumbItem } from '@client/molecules/breadcrumb';
import { Folder } from '@client/models/folderPickerModel/types';
import Card from '@client/molecules/card';

export type Props = {
    onChange?: (folderPath?: string) => void;
};
export default function FolderPicker({ onChange }: Props) {
    const scrollViewRef = useRef<HTMLDivElement>(null);
    const { folderList, fetchStatus, loadFolderList } = useFolderPicker();

    const [selectedFolder, setSelectedFolder] = useState<Folder>();
    const folderPathList = useMemo(() => {
        const result: Array<BreadcrumbItem> = [];
        selectedFolder?.path?.split('/').reduce((pre, cur) => {
            const path = pre + '/' + cur;
            result.push({
                label: cur,
                path,
            });
            return path;
        });

        return result;
    }, [selectedFolder]);
    const handleSelect = (folder: Folder) => {
        setSelectedFolder(folder);
    };

    const handleFolderDoubleClick = (folder: Folder) => {
        setSelectedFolder(folder);
        loadFolderList(folder.path);
    };

    const handleBreadcrumbClick = (item: BreadcrumbItem) => {
        loadFolderList(item.path);
        setSelectedFolder({ name: item.label, path: item.path ?? '' });
    };

    return (
        <Dialog visible={true} header={false}>
            <Stack direction='vertical'>
                <StackItem flex>
                    <ScrollView width={800} height={600} scrollY ref={scrollViewRef}>
                        <FolderView
                            data={folderList ?? []}
                            value={selectedFolder}
                            onClick={(item) => handleSelect(item)}
                            onDoubleClick={(item) => handleFolderDoubleClick(item)}
                        ></FolderView>
                    </ScrollView>
                </StackItem>
                <StackItem>
                    <Breadcrumb
                        items={folderPathList}
                        onClick={handleBreadcrumbClick}
                    ></Breadcrumb>
                    <div>
                        <Button>取消</Button>
                        <Button type='primary'>确定</Button>
                    </div>
                </StackItem>
            </Stack>
        </Dialog>
    );
}
