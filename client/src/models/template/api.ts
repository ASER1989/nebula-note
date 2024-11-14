import request from '@client/utils/request';
import { TemplateRecord } from '@client/models/template/types';

export const getTemplateList = () => {
    return request.get<Array<TemplateRecord>>('/template/list');
};

export const getTemplateDocument = (filePath: string) => {
    return request.get<string>('/template/doc', { path: filePath });
};
export const getTemplateContent = (filePath: string,title:string) => {
    return request.get<string>('/template/content', { path: filePath ,title});
};
export const getTemplateMeta = (filePath: string) => {
    return request.get<string>('/template/meta', { path: filePath });
};

export const templateUpdate = () => {
    return request.get('/template/store/update');
};

export const createTemplate = (postData: TemplateRecord) => {
    return request.post('/template/add', postData);
};

export const updateTemplate = (postData: TemplateRecord) => {
    return request.post('/template/update', postData);
};

export const buildTemplate = (postData: Pick<TemplateRecord, 'meta' | 'document'>) => {
    return request.post<string>('/slice/build/meta', postData);
};

export const buildTemplateWithFormData = <T extends Record<string, unknown>>(
    postData: T,
) => {
    return request.post<string>('/slice/build/form', { ...postData });
};
