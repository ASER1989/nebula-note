import React from 'react';
import _ from 'lodash';
import { EventListener } from './types';

export type Props = {
    addListener: (listener: EventListener) => symbol;
    removeListener: (id: symbol) => void;
};

const defaultContext: Props = {
    addListener: _.noop as any,
    removeListener: _.noop,
};
export const EventContext = React.createContext<Props>(defaultContext);
