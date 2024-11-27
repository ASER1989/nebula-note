import { createSlice } from '@reduxjs/toolkit';
import { FetchStatus } from '@client/types';
import { SnippetRecord, TemplateRecord } from '@client/models/template/types';
import { SupportedLang } from '@client/components/codeEditor/queries';
import _ from 'lodash';

export type SliceType = {
    fetchStatus: FetchStatus;
    template: TemplateRecord & {
        editStatus?: 'Edited' | 'Saved' | 'None';
        activeProperty?: string;
    };
};

export const sliceName = 'snippetList';
export const storeSlice = createSlice({
    name: sliceName,
    initialState: {
        fetchStatus: 'None',
        template: { activeProperty: 'document' } as SliceType['template'],
    },
    reducers: {
        setTemplateFilePath: (state, action: { payload: TemplateRecord }) => {
            state.template = {
                ...action.payload,
                editStatus: 'None',
                activeProperty: 'document',
            };
        },
        setTemplateDocument: (state, action: { payload: string }) => {
            state.template.document = action.payload;
        },
        setSnippetContent: (state, action: { payload: SnippetRecord }) => {
            const snippet = state.template.snippetList?.find(
                (item) => item.title === action.payload.title,
            );
            if (snippet) {
                snippet.content = action.payload.content;
            }
        },
        addSnippet: (state, action: { payload: SnippetRecord }) => {
            state.template.snippetList?.push(action.payload);
            state.template.editStatus = 'Edited';
        },
        removeSnippet: (state, action: { payload: { index: number } }) => {
            const {
                payload: { index },
            } = action;
            state.template.snippetList?.splice(index, 1);
            state.template.editStatus = 'Edited';
        },
        updateSnippet: (
            state,
            action: { payload: { snippet: Partial<SnippetRecord>; index: number } },
        ) => {
            const {
                payload: { index, snippet },
            } = action;
            const ownSnippet = state.template.snippetList?.[index];
            if (ownSnippet) {
                _.assign(ownSnippet, snippet);
                state.template.editStatus = 'Edited';
            }
        },
        setTemplateMeta: (state, action: { payload: string }) => {
            state.template.meta = action.payload;
        },
        updateTemplateMeta: (state, action: { payload: string }) => {
            state.template.meta = action.payload;
            state.template.editStatus = 'Edited';
        },
        updateTemplateDocument: (state, action: { payload: string | undefined }) => {
            state.template.document = action.payload;
            state.template.editStatus = 'Edited';
        },
        templateSaved: (state, action: { payload: { version: number } }) => {
            state.template.version = action.payload.version;
            state.template.editStatus = 'Saved';
        },
        setActiveProperty: (state, action: { payload: string }) => {
            state.template.activeProperty = action.payload;
        },
    },
});

export const actions = storeSlice.actions;

export const reducer = storeSlice.reducer;
