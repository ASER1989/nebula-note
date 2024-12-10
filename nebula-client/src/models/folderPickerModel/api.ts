import request from '@client/utils/request';
import { Folder } from './types';

export const getFolderList = (folderPath: string | null = null) => {
    return request.post<Folder>('/common/folder/list', { folderPath });
};
