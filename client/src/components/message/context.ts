import React from 'react';
import _ from 'lodash';

export type Props = {
    content: string | null;
    setContent: React.Dispatch<React.SetStateAction<string | null>>;
};

const defaultContext: Props = {
    content: null,
    setContent: _.noop,
};
export const MessageContext = React.createContext<Props>(defaultContext);
