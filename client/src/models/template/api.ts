import request from "@client/utils/request";
import {TemplateConfig} from "@client/models/template/types";

export const getTemplateList = () => {
  return request.get<Array<TemplateConfig>>('/template/list');
}

export const getTemplateContent =(filePath:string)=>{
  return request.get<string>('/template/content', {path: filePath})
}
export const getTemplateMeta =(filePath:string)=>{
  return request.get<string>('/template/meta', {path: filePath})
}

export const templateUpdate = () => {
  return request.get('/template/store/update');
}

export const createTemplate = (postData: TemplateConfig) => {
  return request.post('/template/add', postData)
}

export const updateTemplate = (postData: TemplateConfig) => {
  return request.post('/template/update', postData)
}
