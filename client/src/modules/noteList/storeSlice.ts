import { createSlice } from '@reduxjs/toolkit';
import { FetchStatus } from '@client/types';
import { TemplateRecord, NoteRecord } from '@client/models/noteModel/types';
import _ from 'lodash';

export type SliceType = {
    fetchStatus: FetchStatus;
    note: NoteRecord & {
        editStatus?: 'Edited' | 'Saved' | 'None';
        activeProperty?: string;
    };
};

export const sliceName = 'snippetList';
export const storeSlice = createSlice({
    name: sliceName,
    initialState: {
        fetchStatus: 'None',
        note: { activeProperty: 'document' } as SliceType['note'],
    },
    reducers: {
        setTemplateFilePath: (state, action: { payload: NoteRecord }) => {
            state.note = {
                ...action.payload,
                editStatus: 'None',
                activeProperty: 'document',
            };
        },
        setTemplateDocument: (state, action: { payload: string }) => {
            state.note.document = action.payload;
        },
        setSnippetContent: (state, action: { payload: TemplateRecord }) => {
            const template = state.note.templateList?.find(
                (item) => item.title === action.payload.title,
            );
            if (template) {
                template.content = action.payload.content;
            }
        },
        addSnippet: (state, action: { payload: TemplateRecord }) => {
            state.note.templateList?.push(action.payload);
            state.note.editStatus = 'Edited';
        },
        removeSnippet: (state, action: { payload: { index: number } }) => {
            const {
                payload: { index },
            } = action;
            state.note.templateList?.splice(index, 1);
            state.note.editStatus = 'Edited';
        },
        updateSnippet: (
            state,
            action: { payload: { template: Partial<TemplateRecord>; index: number } },
        ) => {
            const {
                payload: { index, template },
            } = action;
            const ownTemplate = state.note.templateList?.[index];
            if (ownTemplate) {
                _.assign(ownTemplate, template);
                state.note.editStatus = 'Edited';
            }
        },
        setTemplateMeta: (state, action: { payload: string }) => {
            state.note.meta = action.payload;
        },
        updateTemplateMeta: (state, action: { payload: string }) => {
            state.note.meta = action.payload;
            state.note.editStatus = 'Edited';
        },
        updateTemplateDocument: (state, action: { payload: string | undefined }) => {
            state.note.document = action.payload;
            state.note.editStatus = 'Edited';
        },
        templateSaved: (state, action: { payload: { version: number } }) => {
            state.note.version = action.payload.version;
            state.note.editStatus = 'Saved';
        },
        setActiveProperty: (state, action: { payload: string }) => {
            state.note.activeProperty = action.payload;
        },
    },
});

export const actions = storeSlice.actions;

export const reducer = storeSlice.reducer;
