import { useEffect } from 'react';
import { store, useSelector, useDispatch } from '@client/store';
import { createSliceInstance } from '@client/store/tools/sliceHelper';

export const useRedux = <SliceType>(stateName: string, initialState: SliceType) => {
    const dispatch = useDispatch();
    const reducerInstance = createSliceInstance(stateName, initialState);

    useEffect(() => {
        store.reducerManager.add(stateName, reducerInstance.reducer);
    }, []);

    const state = useSelector((storeState: Record<string, SliceType>) => {
        return storeState?.[stateName];
    });

    const setState = <T extends typeof initialState>(payload: T) => {
        dispatch(reducerInstance.actions.setState(payload));
    };

    return [state, setState] as const;
};
