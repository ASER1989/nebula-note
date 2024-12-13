import React from 'react';
import _ from 'lodash';

export type Notice = {
    referenceId: number;
    type?: 'success' | 'error' | 'info';
    duration?: number;
    content: string;
    onClose?: () => void;
};

export interface INotificationContext {
    noticeArray: Notice[];
    showNotice: (arg1: string | Omit<Notice, 'referenceId'>) => void;
}

export const defaultContext: INotificationContext = {
    noticeArray: [],
    showNotice: _.noop,
};
export const NotificationContext =
    React.createContext<INotificationContext>(defaultContext);
