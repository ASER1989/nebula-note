import React from 'react';
import _ from 'lodash';

export type Props = {
    store: Record<string, unknown>;
    setStore: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
};

const defaultContext: Props = {
    store: {},
    setStore: _.noop,
};
export const StoreContext = React.createContext<Props>(defaultContext);
