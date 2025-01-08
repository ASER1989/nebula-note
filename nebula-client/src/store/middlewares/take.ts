import _ from 'lodash';
import { AnyAction, Middleware } from 'redux';

interface IActionTaker {
    referenceId: string;
    actionType: string;
    callback: () => string | void;
}

const takerList: Array<IActionTaker> = [];
let recordId = 0;
const removeCallback = (referenceId: string) => {
    _.remove(takerList, (taker) => taker.referenceId === referenceId);
};
export const takeMiddleware: Middleware = () => (next) => (action) => {
    const result = next(action);

    takerList.forEach((taker) => {
        if (taker?.actionType === (action as AnyAction).type) {
            taker.callback();
        }
    });

    return result;
};

export const addTaker = (actionType: string, callback: () => string | void) => {
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
    return () => removeCallback(referenceId as string);
};
