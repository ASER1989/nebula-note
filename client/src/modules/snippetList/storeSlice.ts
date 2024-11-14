import { createSlice } from '@reduxjs/toolkit';
import { FetchStatus } from '@client/types';
import { SnippetRecord, TemplateRecord } from '@client/models/template/types';
import { SupportedLang } from '@client/components/codeEditor/queries';
import _ from 'lodash';

export type SliceType = {
    fetchStatus: FetchStatus;
    template: Partial<TemplateRecord> & {
        editStatus?: 'Edited' | 'Saved' | 'None';
    };
};

export const sliceName = 'snippetList';
export const storeSlice = createSlice({
    name: sliceName,
    initialState: {
        fetchStatus: 'None',
        template: {} as SliceType['template'],
    },
    reducers: {
        setTemplateFilePath: (state, action: { payload: TemplateRecord }) => {
            return {
                fetchStatus: 'None',
                template: {
                    ...action.payload,
                    editStatus: 'None',
                },
            };
        },
        setTemplateDocument: (state, action: { payload: string }) => {
            return {
                fetchStatus: 'None',
                template: {
                    ...state.template,
                    document: action.payload,
                    editStatus: 'None',
                },
            };
        },
        setSnippetContent: (state, action: { payload: SnippetRecord }) => {
            const snippet = state.template.snippetList?.find(
                (item) => item.title === action.payload.title,
            );
            if (snippet) {
                snippet.content = action.payload.content;
            }
        },
        createSnippet: (state, action: { payload: SnippetRecord }) => {
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
            return {
                fetchStatus: 'None',
                template: {
                    ...state.template,
                    meta: action.payload,
                    editStatus: 'None',
                },
            };
        },
        setTemplateLanguage: (
            state,
            action: { payload: (typeof SupportedLang)[number] | undefined },
        ) => {
            return {
                fetchStatus: 'None',
                template: {
                    ...state.template,
                    language: action.payload,
                },
            };
        },
        updateTemplateMeta: (state, action: { payload: string }) => {
            return {
                fetchStatus: 'None',
                template: {
                    ...state.template,
                    meta: action.payload,
                    editStatus: 'Edited',
                },
            };
        },
        updateTemplateDocument: (state, action: { payload: string | undefined }) => {
            return {
                fetchStatus: 'None',
                template: {
                    ...state.template,
                    document: action.payload,
                    editStatus: 'Edited',
                },
            };
        },
        saveTemplate: (state) => {
            return {
                fetchStatus: 'None',
                template: {
                    ...state.template,
                    editStatus: 'Saved',
                },
            };
        },
    },
});

export const actions = storeSlice.actions;

export const reducer = storeSlice.reducer;
