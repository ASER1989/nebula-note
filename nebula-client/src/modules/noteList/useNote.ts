import { NoteRecord, TemplateRecord } from '@client/models/noteModel/types';
import { useRedux } from '@client/store/hooks/useRedux';
import { FetchStatus } from '@client/types';

const REDUX_KEY = 'noteState';

export type NoteState = {
    fetchStatus: FetchStatus;
    note: NoteRecord;
    editStatus?: 'Edited' | 'Saved' | 'None';
    markdownMode?: 'Markdown' | 'Code';
    activeProperty?: string;
    isCreateFormShown: boolean;
};

const initialState: NoteState = {
    fetchStatus: 'None',
    note: {} as NoteRecord,
    editStatus: 'None',
    activeProperty: 'document',
    isCreateFormShown: false,
    markdownMode: 'Markdown',
};

export const useNote = (updateInterceptor?: () => void) => {
    const { state, getStateSync, setState, setStateSync, updateState } =
        useRedux<NoteState>(REDUX_KEY, initialState);

    const updateDecorator = <T extends NoteState>(payload: {
        [K in keyof T]?: Partial<T[K]>;
    }) => {
        updateInterceptor?.();
        updateState(payload);
    };

    const reset = () => {
        setState(initialState);
    };
    const setNoteSync = (note: NoteRecord) => {
        const syncState = getStateSync();
        setStateSync({
            ...syncState,
            note,
            activeProperty: 'document',
            editStatus: 'None',
            fetchStatus: 'Pending',
        });
    };

    const updateNote = (note: Partial<NoteRecord>) => {
        updateDecorator({ note });
    };

    const setMeta = (meta: string) => {
        updateState({ note: { meta } });
    };

    const updateMeta = (meta: string) => {
        updateDecorator({ note: { meta }, editStatus: 'Edited' });
    };

    const setDocument = (document: string) => {
        updateState({ note: { document } });
    };
    const updateDocument = (document: string) => {
        updateDecorator({ note: { document }, editStatus: 'Edited' });
    };

    const setTemplateContent = (payload: TemplateRecord) => {
        const syncState = getStateSync();
        const templateList = syncState.note.templateList?.map((item) => {
            if (item.title === payload.title) {
                return {
                    ...item,
                    content: payload.content,
                };
            }
            return item;
        });
        updateState({ note: { templateList: templateList ?? [] } });
    };

    const addTemplate = (payload: TemplateRecord) => {
        const syncState = getStateSync();
        return updateDecorator({
            note: {
                templateList: [...(syncState.note.templateList || []), payload],
            },
            editStatus: 'Edited',
        });
    };

    const removeTemplate = (index: number) => {
        return updateDecorator({
            note: {
                templateList: state.note.templateList?.filter((item, i) => i !== index),
            },
            editStatus: 'Edited',
        });
    };

    const updateTemplate = (payload: {
        template: Partial<TemplateRecord>;
        index: number;
    }) => {
        const { index, template } = payload;

        const templateList = state.note.templateList?.map((item, idx) => {
            if (idx === index) {
                return {
                    ...item,
                    ...template,
                };
            }
            return item;
        });
        updateDecorator({
            note: { templateList: templateList ?? [] } as NoteRecord,
            editStatus: 'Edited',
        });
    };

    const setNoteSaved = (payload: { version: number }) => {
        const { version } = payload;
        updateState({ note: { version } as NoteRecord, editStatus: 'Saved' });
    };

    const setActiveProperty = (activeProperty: string) => {
        updateState({ activeProperty });
    };

    const setCreateFormShown = (isCreateFormShown: boolean) => {
        updateState({ isCreateFormShown });
    };
    const setFetchStatus = (fetchStatus: FetchStatus) => {
        return updateState({ fetchStatus });
    };

    const switchMarkdownMode = (markdownMode: NoteState['markdownMode']) => {
        return updateState({ markdownMode });
    };

    return {
        state,
        getStateSync,
        reset,
        setNoteSync,
        updateNote,
        setMeta,
        updateMeta,
        setDocument,
        updateDocument,
        setTemplateContent,
        addTemplate,
        removeTemplate,
        updateTemplate,
        setNoteSaved,
        setActiveProperty,
        setCreateFormShown,
        setFetchStatus,
        switchMarkdownMode
    };
};

export default useNote;
