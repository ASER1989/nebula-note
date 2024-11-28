import { createSlice } from '@reduxjs/toolkit';
import { FetchStatus } from '@client/types';
import { TemplateRecord, NoteRecord } from '@client/models/noteModel/types';
import _ from 'lodash';

export type SliceType = {
    fetchStatus: FetchStatus;
    note: NoteRecord;
    editStatus?: 'Edited' | 'Saved' | 'None';
    activeProperty?: string;
};

export const sliceName = 'noteList';
export const storeSlice = createSlice({
    name: sliceName,
    initialState: {
        fetchStatus: 'None',
        note: {} as SliceType['note'],
        editStatus: 'None',
        activeProperty: 'document',
    },
    reducers: {
        setNote: (state, action: { payload: NoteRecord }) => {
            return {
                fetchStatus: 'None',
                note: {
                    ...action.payload,
                },
                editStatus: 'None',
                activeProperty: 'document',
            };
        },
        updateNote: (state, action: { payload: Partial<SliceType['note']> }) => {
            state.note = {
                ...state.note,
                ...action.payload,
            };
        },
        setMeta: (state, action: { payload: string }) => {
            state.note.meta = action.payload;
        },
        updateMeta: (state, action: { payload: string }) => {
            state.note.meta = action.payload;
            state.editStatus = 'Edited';
        },
        setDocument: (state, action: { payload: string }) => {
            state.note.document = action.payload;
        },
        updateDocument: (state, action: { payload: string | undefined }) => {
            state.note.document = action.payload;
            state.editStatus = 'Edited';
        },
        setTemplateContent: (state, action: { payload: TemplateRecord }) => {
            const template = state.note.templateList?.find(
                (item) => item.title === action.payload.title,
            );
            if (template) {
                template.content = action.payload.content;
            }
        },
        addTemplate: (state, action: { payload: TemplateRecord }) => {
            state.note.templateList?.push(action.payload);
            state.editStatus = 'Edited';
        },
        removeTemplate: (state, action: { payload: { index: number } }) => {
            const {
                payload: { index },
            } = action;
            state.note.templateList?.splice(index, 1);
            state.editStatus = 'Edited';
        },
        updateTemplate: (
            state,
            action: { payload: { template: Partial<TemplateRecord>; index: number } },
        ) => {
            const {
                payload: { index, template },
            } = action;
            const ownTemplate = state.note.templateList?.[index];
            if (ownTemplate) {
                _.assign(ownTemplate, template);
                state.editStatus = 'Edited';
            }
        },
        setNoteSaved: (state, action: { payload: { version: number } }) => {
            state.note.version = action.payload.version;
            state.editStatus = 'Saved';
        },
        setActiveProperty: (state, action: { payload: string }) => {
            state.activeProperty = action.payload;
        },
    },
});

export const actions = storeSlice.actions;

export const reducer = storeSlice.reducer;
