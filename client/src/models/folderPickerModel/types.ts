import { FetchStatus } from '@client/types';

export type Folder = {
    name: string;
    path: string;
    children?: Folder[];
};

export type FolderPickerState = {
    folderList?: Array<Folder>;
    fetchStatus: FetchStatus;
    error?: string;
};
