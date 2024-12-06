import request from '@client/utils/request';
import {Settings} from "@client/models/settingsModel/types";

export const getSettings = () => {
    return request.get<Settings>('/settings');
};

export const saveSettings = (data: Settings) => {
    return request.post('/settings', data);
};