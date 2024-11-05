import request from "@client/utils/request";
import {TemplateConfig} from "@client/models/template/types";

export const getTemplateList = () => {
  return request.get<Array<TemplateConfig>>('/template/list');
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
