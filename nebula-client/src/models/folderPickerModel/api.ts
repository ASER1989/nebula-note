import request from '@client/utils/request';
import { Folder } from './types';

export const getFolderList = (path: string | null = null) => {
    return request.post<Array<Folder>>('/common/folder/list', { path });
};
