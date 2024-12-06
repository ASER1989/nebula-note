import { Reducer, combineReducers, Action } from '@reduxjs/toolkit';

// 定义 `ReducerManager` 的类型接口
export interface ReducerManager<State> {
    getReducerMap: () => Record<string, Reducer<unknown, Action>>;
    reduce: (state: State | undefined, action: Action) => State | unknown;
    add: <SliceState>(key: string, reducer: Reducer<SliceState, Action>) => void;
    remove: (key: string) => void;
}

// 创建 reducer 管理器函数
export function createReducerManager<State>(
    initialReducers: Record<string, Reducer>,
): ReducerManager<State> {
    const reducers = { ...initialReducers };
    let combinedReducer = combineReducers(reducers);
    let keysToRemove: string[] = [];

    return {
        getReducerMap: () => reducers,

        reduce: (state, action) => {
            // 如果有需要移除的 reducer，将其从 state 中删除
            if (keysToRemove.length > 0) {
                state = { ...state } as State;
                keysToRemove.forEach((key) => {
                    delete (state as Record<string, unknown>)?.[key];
                });
                keysToRemove = [];
            }

            // 返回当前的 combinedReducer 结果
            return combinedReducer(state ?? {}, action);
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
