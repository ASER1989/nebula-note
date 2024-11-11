import React, { useState } from 'react';
import { StoreContext } from './storeContext';

type Props = {
    children: React.ReactNode | Array<React.ReactNode>;
};

export default function Store({ children }: Props) {
    const [store, setStore] = useState<Record<string, unknown>>({});
    return (
        <StoreContext.Provider value={{ store, setStore }}>
            {children}
        </StoreContext.Provider>
    );
}
