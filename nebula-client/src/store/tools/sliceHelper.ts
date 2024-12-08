import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

export const createSliceInstance = <T>(sliceName: string, initialState: T) =>
    createSlice({
        name: sliceName,
        initialState,
        reducers: {
            setState: (state, action: { payload: T }) => {
                return action.payload;
            },
            updateState: (state, action: { payload: Partial<T> }) => {
                return _.mergeWith({}, state, action.payload, (objValue, srcValue) => {
                    if (Array.isArray(objValue)) {
                        return srcValue;
                    }
                });
            },
        },
    });
