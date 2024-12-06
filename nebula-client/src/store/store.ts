import { configureStore, EnhancedStore, Reducer } from '@reduxjs/toolkit';
import { createReducerManager, ReducerManager } from './reducerManager';
import {
    enhanceStoreWithTakeOnce,
    takeOnceMiddleware,
    TakeOnceStore,
} from './middlewares/takeOnce';

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
