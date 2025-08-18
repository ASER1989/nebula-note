import request from '@client/utils/request';
import { NoteRecord } from './types';

export const getNoteList = () => {
    return request.get<Array<NoteRecord>>('/note/list');
};

export const reorderNote = (activeName: string, overName: string) => {
    return request.post('/note/reorder', { activeName, overName });
}

export const getNoteDocument = (filePath: string) => {
    return request.get<string>('/note/doc', { path: filePath });
};
export const getNoteContent = (filePath: string, title: string) => {
    return request.get<string>('/note/content', { path: filePath, title });
};
export const getNoteMeta = (filePath: string) => {
    return request.get<string>('/note/meta', { path: filePath });
};

export const noteStoreUpdate = () => {
    return request.get('/note/store/update');
};

export const noteUpsert = (postData: NoteRecord & { replace?: boolean }) => {
    return request.post<number>('/note/upsert', postData);
};

export const noteRemove = (name: string) => {
    return request.post<string>('/note/remove', { name });
};

export const noteRename = (name: string, newName: string) => {
    return request.post<NoteRecord>('/note/rename', { name, newName });
};

export const buildTemplate = (postData: {
    meta?: string;
    content: string;
    filePath?: string;
}) => {
    return request.post<string>('/slice/build/meta', postData);
};

export const imageUpload = (
    file: File,
    postData: {
        filePath?: string;
    },
) => {
    return request.upload<string>('/note/image/upload', file, postData);
};
