import { EnhancedStore, Reducer, configureStore } from '@reduxjs/toolkit';
import {
    TakeOnceStore,
    enhanceStoreWithTakeOnce,
    takeOnceMiddleware,
} from './middlewares/takeOnce';
import { ReducerManager, createReducerManager } from './reducerManager';

export type RootState = Record<string, unknown>;
type Store = EnhancedStore<RootState> & {
    reducerManager: ReducerManager<RootState>;
} & TakeOnceStore;

const emptyReducer = (state = {}) => state;

const staticReducers = {
    placeholder: emptyReducer,
};

export const reducerManager = createReducerManager<RootState>(staticReducers);

const defaultStore = configureStore({
    reducer: reducerManager.reduce as Reducer<RootState>,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(takeOnceMiddleware),
}) as Store;

defaultStore.reducerManager = reducerManager;

export const store = enhanceStoreWithTakeOnce(defaultStore) as Store;
export type AppDispatch = typeof store.dispatch;
