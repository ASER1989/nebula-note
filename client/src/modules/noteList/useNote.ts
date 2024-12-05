import { useRedux } from '@client/store/hooks/useRedux';
import { FetchStatus } from '@client/types';
import { NoteRecord, TemplateRecord } from '@client/models/noteModel/types';

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
    const { state, setState, updateState } = useRedux<NoteState>(
        REDUX_KEY,
        initialState,
    );

    const reset = () => {
        setState(initialState);
    };
    const setNote = (note: NoteRecord) => {
        updateState({ note });
    };

    const updateNote = (note: Partial<NoteRecord>) => {
        updateState({ note: { ...state.note, ...note } });
    };

    const setMeta = (meta: string) => {
        updateState({ note: { meta } as NoteRecord });
    };

    const updateMeta = (meta: string) => {
        updateState({ note: { meta } as NoteRecord, editStatus: 'Edited' });
    };

    const setDocument = (document: string) => {
        updateState({ note: { document } as NoteRecord });
    };
    const updateDocument = (document: string) => {
        updateState({ note: { document } as NoteRecord, editStatus: 'Edited' });
    };

    const setTemplateContent = (payload: TemplateRecord) => {
        const templateList = state.note.templateList?.map((item) => {
            if (item.title === payload.title) {
                return {
                    ...item,
                    content: payload.content,
                };
            }
            return item;
        });
        updateState({ note: { templateList: templateList ?? [] } as NoteRecord });
    };

    const addTemplate = (payload: TemplateRecord) => {
        updateState({
            note: {
                templateList: [...(state.note.templateList || []), payload],
            } as NoteRecord,
            editStatus: 'Edited',
        });
    };

    const removeTemplate = (index: number) => {
        updateState({
            note: {
                templateList: state.note.templateList?.filter((item, i) => i !== index),
            } as NoteRecord,
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
