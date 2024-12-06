import { AnyAction, Middleware, Store } from 'redux';

export interface TakeOnceStore extends Store {
    takeOnce: (actionType: string, callback: () => void) => void;
}

interface IActionTaker {
    recordId: string;
    actionType: string;
    callback: () => void;
}

const takeOnceCallbacks: Array<IActionTaker> = [];
export const takeOnceMiddleware: Middleware = (store) => (next) => (action) => {
    const result = next(action);

    const callBackStash: Array<IActionTaker> = [];
    while (takeOnceCallbacks.length > 0) {
        const taker = takeOnceCallbacks.shift();
        if (taker) {
            if (taker?.actionType === (action as AnyAction).type) {
                taker.callback();
                continue;
            }
            callBackStash.push(taker);
        }
    }

    takeOnceCallbacks.push(...callBackStash);

    return result;
};

export const enhanceStoreWithTakeOnce = (store: Store): TakeOnceStore => {
    const enhancedStore = store as TakeOnceStore;
    let recordId = 0;
    enhancedStore.takeOnce = (actionType: string, callback: () => void) => {
        const isExist = takeOnceCallbacks.some(
            (taker) =>
                taker.recordId === callback.name && taker.actionType === actionType,
        );
        if (!isExist) {
            recordId++;
            takeOnceCallbacks.push({
                recordId: callback.name ?? recordId.toString(),
                actionType,
                callback,
            });
        }
    };
    return enhancedStore;
};
