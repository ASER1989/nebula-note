import request from "@client/utils/request";
import {TemplateConfig} from "@client/models/template/types";

export const fetchTemplateList =async ()=> await request.get<Array<TemplateConfig>>('/template/list')

export const fetchTemplateContent = async (filePath: string) => await request.get<string>('/template/detail', {path: filePath})
