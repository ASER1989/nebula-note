import {
    TakeStore,
    enhanceStoreWithTake,
    takeMiddleware,
} from '@client/store/middlewares/take';
import { EnhancedStore, Reducer, configureStore } from '@reduxjs/toolkit';
import { ReducerManager, createReducerManager } from './reducerManager';

export type RootState = Record<string, unknown>;
type Store = EnhancedStore<RootState> & {
    reducerManager: ReducerManager<RootState>;
} & TakeStore;

const emptyReducer = (state = {}) => state;

const staticReducers = {
    placeholder: emptyReducer,
};

const reducerManager = createReducerManager<RootState>(staticReducers);

const defaultStore = configureStore({
    reducer: reducerManager.reduce as Reducer<RootState>,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(takeMiddleware),
}) as Store;

defaultStore.reducerManager = reducerManager;

export const store = enhanceStoreWithTake(defaultStore) as Store;
