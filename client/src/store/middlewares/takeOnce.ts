import { Store, Middleware, AnyAction } from 'redux';

export interface TakeOnceStore extends Store {
    takeOnce: (actionType: string, callback: <T>(state: T) => void) => void;
}

const takeOnceCallbacks: Array<{
    recordId: number;
    actionType: string;
    callback: <T>(state: T) => void;
}> = [];
export const takeOnceMiddleware: Middleware = (store) => (next) => (action) => {
    const result = next(action);
    const state = store.getState();

    takeOnceCallbacks.forEach(({ actionType, callback }) => {
        if (actionType === (action as AnyAction).type) {
            callback(state);
        }
    });

    return result;
};

export const enhanceStoreWithTakeOnce = (store: Store): TakeOnceStore => {
    const enhancedStore = store as TakeOnceStore;
    let recordId = 0;
    enhancedStore.takeOnce = (actionType: string, callback: <T>(state: T) => void) => {
        recordId++;
        takeOnceCallbacks.push({
            recordId,
            actionType,
            callback: (state) => {
                callback(state);
                const idx = takeOnceCallbacks.findIndex(
                    (item) => item.recordId === recordId,
                );
                if (idx >= 0) {
                    takeOnceCallbacks.splice(idx, 1);
                }
            },
        });
    };
    return enhancedStore;
};
