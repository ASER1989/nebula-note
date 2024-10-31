import request from "@client/utils/request";
import {TemplateConfig} from "@client/models/template/types";

const LIST_URL = '/template/list';
const UPDATE_URL = '/template/store/update';

export const getTemplateList = () => {
  return request.get<Array<TemplateConfig>>(LIST_URL);
}

export const templateUpdate = () => {
  return request.get(UPDATE_URL);
}
