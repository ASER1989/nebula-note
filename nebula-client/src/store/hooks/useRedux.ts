import { useEffect, useMemo } from 'react';
import { store } from '@client/store';
import { useSelector, useDispatch } from 'react-redux';
import { createSliceInstance } from '@client/store/tools/sliceHelper';

export const useRedux = <SliceType>(stateName: string, initialState: SliceType) => {
    const dispatch = useDispatch();
    const reducerInstance = useMemo(
        () => createSliceInstance(stateName, initialState),
        [stateName, initialState],
    );

    useEffect(() => {
        store.reducerManager.add(stateName, reducerInstance.reducer);
    }, []);

    const state = useSelector((storeState: Record<string, SliceType>) => {
        if (Object.prototype.hasOwnProperty.call(storeState, stateName)) {
            return storeState[stateName] as SliceType;
        }
        return initialState;
    });

    const getStateSync = () => {
        return store.getState()[stateName] as SliceType;
    };

    const setState = <T extends typeof initialState>(payload: T) => {
        dispatch(reducerInstance.actions.setState(payload));
    };
    const updateState = <T extends typeof initialState>(payload: {
        [K in keyof T]?: Partial<T[K]>;
    }) => {
        dispatch(reducerInstance.actions.updateState(payload));
    };

    const takeOnce = (actionType: 'setState' | 'updateState') => {
        let resolveHandle: () => void;
        const promiseHandle = new Promise<void>((resolve) => {
            resolveHandle = resolve;
        });
        store.takeOnce(`${stateName}/${actionType}`, () => {
            resolveHandle();
        });
        return promiseHandle;
    };

    return { state, getStateSync, setState, updateState, takeOnce } as const;
};
