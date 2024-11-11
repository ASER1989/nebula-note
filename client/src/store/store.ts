import { configureStore, EnhancedStore, Reducer } from '@reduxjs/toolkit';
import { createReducerManager, ReducerManager } from './reducerManager';

// 定义初始的状态类型
export type RootState = Record<string, unknown>;
type Store = EnhancedStore<RootState> & {
    reducerManager: ReducerManager<RootState>;
};

// 定义静态 reducers
const staticReducers = {};

// 创建 reducer manager
export const reducerManager = createReducerManager<RootState>(staticReducers);

// 配置 store，传入 reducerManager 的 reduce 方法
export const store = configureStore({
    reducer: reducerManager.reduce as Reducer<RootState>,
}) as Store;

// 将 reducerManager 绑定到 store 上
store.reducerManager = reducerManager;
