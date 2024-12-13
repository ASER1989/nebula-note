import { useEffect, useMemo } from 'react';
import { store } from '@client/store';
import { createSliceInstance } from '@client/store/tools/sliceHelper';
import { useDispatch, useSelector } from 'react-redux';

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

    const getStateSync = () => {
        return store.getState()[stateName] as SliceType;
    };

    const setState = (payload: SliceType) => {
        dispatch(reducerInstance.actions.setState(payload));
    };
    const setStateSync = (payload: SliceType) => {
        (async () => {
            const takeHandle = takeOnce('setState');
            setState(payload);
            await takeHandle;
        })();
    };
    const updateState = <T extends typeof initialState>(payload: {
        [K in keyof T]?: Partial<T[K]>;
    }) => {
        dispatch(reducerInstance.actions.updateState(payload));
    };
    const updateStateSync = <T extends typeof initialState>(payload: {
        [K in keyof T]?: Partial<T[K]>;
    }) => {
        (async () => {
            const takeHandle = takeOnce('updateState');
            updateState(payload);
            await takeHandle;
        })();
    };

    return {
        state,
        getStateSync,
        setState,
        setStateSync,
        updateState,
        updateStateSync,
        takeOnce,
    } as const;
};
