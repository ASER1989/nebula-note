import { addTaker, takeMiddleware } from '@client/store/middlewares/take';
import {
    ConfigureStoreOptions,
    EnhancedStore,
    Reducer,
    configureStore as toolkitConfigureStore,
} from '@reduxjs/toolkit';
import { ReducerManager, createReducerManager } from './tools/reducerManager';

interface Store<State> extends EnhancedStore<State> {
    reducerManager: ReducerManager<State>;
    addTaker: (actionType: string, callback: () => void) => () => void;
}

export const configureStore = <State = Record<string, unknown>>(
    options: ConfigureStoreOptions<State> = {} as ConfigureStoreOptions<State>,
): Store<State> => {
    const reducerHolder = {
        __holder: (state = '1.0.0') => state,
    };

    const reducerManager = createReducerManager<State>(options?.reducer ?? reducerHolder);

    const store = toolkitConfigureStore({
        ...options,
        reducer: reducerManager.reduce as Reducer<State>,
        middleware: (getDefaultMiddleware) => {
            if (options.middleware) {
                const middlewares = options.middleware(getDefaultMiddleware);
                return middlewares.concat(takeMiddleware);
            }
            return getDefaultMiddleware().concat(takeMiddleware);
        },
    }) as Store<State>;

    reducerManager.remove('__holder');
    store.reducerManager = reducerManager;
    store.addTaker = addTaker;

    return store;
};
