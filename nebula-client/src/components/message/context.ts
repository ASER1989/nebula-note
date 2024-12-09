import React from 'react';
import _ from 'lodash';

export type MessageInstance = {
    content: string;
    onClose: () => void;
};

export interface IMessageContext {
    setContent: (content: string | null, onClose?: () => void) => number;
    removeContent: (id: number) => void;
    messageList: Array<MessageInstance>;
    lastUpdateTime: number;
}

const defaultContext: IMessageContext = {
    setContent: () => -1,
    removeContent: _.noop,
    messageList: [],
    lastUpdateTime: 0,
};
export const MessageContext = React.createContext<IMessageContext>(defaultContext);
