import React from 'react';
import _ from 'lodash';

export type EventCallback = (confirm?: boolean) => void;
export type Options = {
    title?: string;
    content: string;
    cancelText?: string;
    confirmText?: string;
    callback?: EventCallback;
};
export type Props = {
    options: Options | null;
    showConfirm: (arg1: string | Options, callback?: EventCallback) => void;
    onClose: (confirm?: boolean) => void;
};

export const defaultContext: Props = {
    options: { content: '', cancelText: '取消', confirmText: '确定' },
    showConfirm: _.noop,
    onClose: _.noop,
};
export const ConfirmContext = React.createContext<Props>(defaultContext);
