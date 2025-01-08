import {
    ConfigureStoreOptions,
    Reducer,
    combineReducers,
} from '@reduxjs/toolkit';

type StoreReducer<State> = ConfigureStoreOptions<State>['reducer'];

export interface ReducerManager<State> {
    getReducerMap: () => Record<string, Reducer>;
    reduce: (state: State | undefined, action: any) => State;
    add: (key: string, reducer: Reducer) => void;
    remove: (key: string) => void;
}

export function createReducerManager<State>(
    initialReducers: StoreReducer<State> = {} as StoreReducer<State>,
): ReducerManager<State> {
    const reducers = { ...initialReducers } as Record<string, Reducer>;
    let combinedReducer = combineReducers(reducers);
    let keysToRemove: string[] = [];

    return {
        getReducerMap: () => reducers,

        reduce: (state, action) => {
            if (keysToRemove.length > 0) {
                state = { ...state } as State;
                keysToRemove.forEach((key) => {
                    delete (state as Record<string, unknown>)?.[key];
                });
                keysToRemove = [];
            }
            return combinedReducer(state ?? {}, action) as State;
        },

        add: (key, reducer) => {
            if (!key || reducers[key]) return;

            reducers[key] = reducer;
            combinedReducer = combineReducers(reducers);
        },

        remove: (key) => {
            if (!key || !reducers[key]) return;

            delete reducers[key];
            keysToRemove.push(key);
            combinedReducer = combineReducers(reducers);
        },
    };
}
