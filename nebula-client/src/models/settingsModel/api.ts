import { Settings } from '@client/models/settingsModel/types';
import request from '@client/utils/request';

export const getSettings = () => {
    return request.get<Settings>('/settings');
};

export const saveSettings = (data: Settings) => {
    return request.post('/settings', data);
};
