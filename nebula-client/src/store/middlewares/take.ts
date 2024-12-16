import _ from 'lodash';
import { AnyAction, Middleware, Store } from 'redux';

export interface TakeStore extends Store {
    addTaker: (actionType: string, callback: () => void) => () => void;
}

interface IActionTaker {
    referenceId: string;
    actionType: string;
    callback: () => string | void;
}

const takerList: Array<IActionTaker> = [];
let recordId = 0;
const removeCallback = (referenceId: string) => {
    console.log('taker remove', referenceId.toString());
    _.remove(takerList, (taker) => taker.referenceId === referenceId);
};
export const takeMiddleware: Middleware = () => (next) => (action) => {
    const result = next(action);

    takerList.forEach((taker) => {
        if (taker?.actionType === (action as AnyAction).type) {
            console.log('taker call:', taker.referenceId);
            taker.callback();
        }
    });

    return result;
};

const addTaker = (actionType: string, callback: () => string | void) => {
    const existObj = takerList.find((taker) => taker.referenceId === callback.name);
    let referenceId = existObj?.referenceId;
    if (!existObj) {
        recordId++;
        const takeObj = {
            referenceId: callback.name ? callback.name : recordId.toString(),
            actionType,
            callback,
        };
        takerList.push(takeObj);
        referenceId = takeObj.referenceId;
    }
    console.log('add taker:', referenceId);
    return () => removeCallback(referenceId as string);
};

export const enhanceStoreWithTake = (store: Store): TakeStore => {
    const enhancedStore = store as TakeStore;
    enhancedStore.addTaker = addTaker;
    return enhancedStore;
};
