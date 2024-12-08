import { NoteRecord, TemplateRecord } from '@client/models/noteModel/types';
import { useRedux } from '@client/store/hooks/useRedux';
import { FetchStatus } from '@client/types';

const REDUX_KEY = 'noteState';

export type NoteState = {
    fetchStatus: FetchStatus;
    note: NoteRecord;
    editStatus?: 'Edited' | 'Saved' | 'None';
    activeProperty?: string;
    isCreateFormShown: boolean;
};

const initialState: NoteState = {
    fetchStatus: 'None',
    note: {} as NoteRecord,
    editStatus: 'None',
    activeProperty: 'document',
    isCreateFormShown: false,
};

export const useNote = () => {
    const {
        state,
        getStateSync,
        setState,
        setStatePromise,
        updateState,
        updateStatePromise,
    } = useRedux<NoteState>(REDUX_KEY, initialState);

    const reset = () => {
        setState(initialState);
    };
    const setNote = (note: NoteRecord) => {
        return setStatePromise({
            ...state,
            note,
            activeProperty: 'document',
            editStatus: 'None',
        });
    };

    const updateNote = (note: Partial<NoteRecord>) => {
        updateState({ note });
    };

    const setMeta = (meta: string) => {
        updateState({ note: { meta } });
    };

    const updateMeta = (meta: string) => {
        updateState({ note: { meta }, editStatus: 'Edited' });
    };

    const setDocument = (document: string) => {
        updateState({ note: { document } });
    };
    const updateDocument = (document: string) => {
        updateState({ note: { document }, editStatus: 'Edited' });
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
        return updateState({
            note: {
                templateList: [...(syncState.note.templateList || []), payload],
            },
            editStatus: 'Edited',
        });
    };

    const removeTemplate = (index: number) => {
        return updateState({
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
        updateState({
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

    return {
        state,
        reset,
        setNote,
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
    };
};

export default useNote;
