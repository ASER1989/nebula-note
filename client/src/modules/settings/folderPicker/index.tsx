import React, { useMemo, useState, useRef, useEffect } from 'react';
import Dialog from '@client/molecules/dialog';
import ScrollView from '@client/molecules/scrollView';
import FolderView from '@client/components/folderView';
import { Stack, StackItem } from '@client/molecules/stack';
import Button from '@client/atoms/button';
import useFolderPicker from '@client/models/folderPickerModel/useFolderPicker';
import Breadcrumb, { BreadcrumbItem } from '@client/molecules/breadcrumb';
import { Folder } from '@client/models/folderPickerModel/types';

export type Props = {
    onChange?: (folderPath?: string) => void;
    onClose?: () => void;
    visible: boolean;
};

export default function FolderPicker({ onChange, onClose, visible }: Props) {
    const scrollViewRef = useRef<HTMLDivElement>(null);
    const { folderList, fetchStatus, loadFolderList } = useFolderPicker();

    const [selectedFolder, setSelectedFolder] = useState<Folder>();

    useEffect(() => {
        if ((!selectedFolder && folderList?.length) ?? 0 > 0) {
            const firstFolder = folderList?.[0];
            if (firstFolder) {
                const parentFolder = {
                    name: '',
                    path: firstFolder.path.replace('/' + firstFolder.name, ''),
                };
                setSelectedFolder(parentFolder);
            }
        }
    }, [selectedFolder, folderList]);

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

    const handleConfirm = () => {
        onChange?.(selectedFolder?.path);
        onClose?.();
    };

    return (
        <Dialog visible={visible} title='打开文件夹' onClose={onClose}>
            <Stack direction='vertical'>
                <StackItem flex style={{ borderBottom: 'solid 1px #e0e0e0' }}>
                    <ScrollView width={800} height={600} scrollY ref={scrollViewRef}>
                        <FolderView
                            data={folderList ?? []}
                            value={selectedFolder}
                            onClick={(item) => handleSelect(item)}
                            onDoubleClick={(item) => handleFolderDoubleClick(item)}
                        ></FolderView>
                    </ScrollView>
                </StackItem>
                <StackItem
                    style={{
                        padding: 6,
                        height: 34,
                        borderBottom: 'solid 1px #e0e0e0',
                        overflow: 'hidden',
                        width: 800,
                    }}
                >
                    <Breadcrumb
                        items={folderPathList}
                        onClick={handleBreadcrumbClick}
                    ></Breadcrumb>
                </StackItem>
                <StackItem style={{ padding: 8 }}>
                    <Stack justify='flex-end' align='center' spacing={20}>
                        <StackItem>
                            <Button onClick={() => onClose?.()}>取消</Button>
                        </StackItem>
                        <StackItem>
                            <Button onClick={handleConfirm} type='primary'>
                                确定
                            </Button>
                        </StackItem>
                    </Stack>
                </StackItem>
            </Stack>
        </Dialog>
    );
}
