import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Folder } from '@client/models/folderPickerModel/types';
import useFolderPicker from '@client/models/folderPickerModel/useFolderPicker';
import { FolderView } from '@nebula-note/ui';
import { Button } from '@nebula-note/ui';
import { Breadcrumb, BreadcrumbItem } from '@nebula-note/ui';
import { Dialog } from '@nebula-note/ui';
import { ScrollView } from '@nebula-note/ui';
import { Stack, StackItem } from '@nebula-note/ui';

export type Props = {
    onChange?: (folderPath: string) => void;
    onClose?: () => void;
    visible: boolean;
};

export default function FolderPicker({ onChange, onClose, visible }: Props) {
    const scrollViewRef = useRef<HTMLDivElement>(null);
    const { folderRoot, folderList, loadFolderList } = useFolderPicker();

    const [selectedFolder, setSelectedFolder] = useState<Folder>();

    useEffect(() => {
        if (visible) {
            loadFolderList();
        }
    }, [visible]);

    const folderPathList = useMemo(() => {
        const result: Array<BreadcrumbItem> = [];
        (selectedFolder ?? folderRoot)?.path?.split('/').reduce((pre, cur) => {
            const path = pre + '/' + cur;
            result.push({
                label: cur,
                path,
            });
            return path;
        });

        return result;
    }, [selectedFolder, folderRoot]);
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
        if (selectedFolder) {
            onChange?.(selectedFolder.path);
        }
        onClose?.();
    };

    return (
        <Dialog visible={visible} title='打开文件夹' onClose={onClose}>
            <Stack direction='vertical'>
                <StackItem flex style={{ borderBottom: 'solid 1px #e0e0e0' }}>
                    <ScrollView width='50vw' height='50vh' scrollY ref={scrollViewRef}>
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
