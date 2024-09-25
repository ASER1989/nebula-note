import React, {useContext, useMemo, useCallback} from 'react';
import _ from 'lodash';
import {StoreContext} from "./storeContext";

export default function useStore<T>(defaultValue: T, path?: string) {
    const {store, setStore} = useContext(StoreContext);

    const updateState = useCallback((newState: T) => {
        setStore((ownState: Record<string, unknown>) => {
            if (path) {
                return _.set(ownState, path, newState);
            }
            return {
                ...ownState,
                ...newState
            }
        });
    }, [setStore]);

    const storeSlice = useMemo(() => {
        if (path) {
            return (_.get(store, path) ?? defaultValue) as unknown as T;
        }
        return (store ?? defaultValue) as unknown as T;
    }, [store, path, defaultValue]);

    return [storeSlice, updateState] as const;
}

