import { useEffect, useMemo } from 'react';
import { store, useSelector, useDispatch } from '@client/store';
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

    const setState = <T extends typeof initialState>(payload: T) => {
        dispatch(reducerInstance.actions.setState(payload));
    };
    const updateState = <T extends typeof initialState>(payload: Partial<T>) => {
        dispatch(reducerInstance.actions.updateState(payload));
    };

    const takeOnce = (
        actionType: 'setState' | 'updateState',
        callback: <T>(state: T) => void,
    ) => {
        store.takeOnce(`${stateName}/${actionType}`, callback);
    };

    return { state, setState, updateState, takeOnce } as const;
};
