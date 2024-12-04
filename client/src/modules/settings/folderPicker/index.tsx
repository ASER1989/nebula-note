import React, { useEffect, useState } from 'react';
import FolderTree from '@client/components/folderTree';
import request from '@client/utils/request';
import type { Folder } from '@client/components/folderTree/types';
import Dialog from "@client/molecules/dialog";

export type Props = {
    onChange?: (folderPath?: string) => void;
}
export default function FolderPicker({onChange}:Props) {

 const [folderTreeData,setFolderTreeData] = useState({path:'',children:[]});

    useEffect(() => {
        request.get<Folder>('/common/folder').then((resp) => {
            setFolderTreeData(resp.data);
        });
    }, []);

    const handleFolderTreeChange = (folder: Folder) => {
        setFolderTreeData({ ...folder });
    };
    const handleFolderCheck = (folderPath: string, isChecked: boolean) => {
       console.log(folderPath, isChecked);
        onChange?.(isChecked ? folderPath : undefined);
    };

    return (
        <Dialog visible={true}>
            <div style={{height:'60vh',overflow:'auto',width:'60vw'}}>
            <FolderTree
                folder={folderTreeData}
                checkedPath={undefined}
                onChange={handleFolderTreeChange}
                onCheck={handleFolderCheck}
            />
            </div>
        </Dialog>
    );
}
