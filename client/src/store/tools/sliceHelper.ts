import { createSlice } from '@reduxjs/toolkit';

export { useSelector } from 'react-redux';
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
                return _.defaultsDeep({}, action.payload, state);
            },
        },
    });
