import React from 'react';
import _ from 'lodash';

export type MessageInstance = {
    content: string;
    onClose: () => void;
    buttonText:string;
};

export interface IMessageContext {
    setContent: (content: string | null, onClose?: () => void, buttonText?: string) => number;
    removeContent: (id: number) => void;
    messageList: Array<MessageInstance>;
    lastUpdateTime: number;
    defaultButtonText: string;
}

const defaultContext: IMessageContext = {
    setContent: () => -1,
    removeContent: _.noop,
    messageList: [],
    lastUpdateTime: 0,
    defaultButtonText: 'ok',
};
export const MessageContext = React.createContext<IMessageContext>(defaultContext);
