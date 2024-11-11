import React from 'react';
import _ from 'lodash';

export type EventCallback = (confirm?: boolean) => void;
export type Props = {
    content: string | null;
    showConfirm: (newContent: string, callback?: EventCallback) => void;
    onClose: (confirm?: boolean) => void;
};

const defaultContext: Props = {
    content: null,
    showConfirm: _.noop,
    onClose: _.noop,
};
export const ConfirmContext = React.createContext<Props>(defaultContext);
