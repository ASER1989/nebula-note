import { useEffect, useMemo } from 'react';
import { useNotification } from '@client/components/notificationBox';
import { useLocalization } from '@client/localizations/useLocalization';
import { usePermissions } from '@client/models/permissions/usePermissions';
import { useRedux } from '@client/store/hooks/useRedux';
import { FetchStatus } from '@client/types';
import { queryErrorMessage } from '@client/utils/queries';
import { Response } from '@client/utils/request';
import { getNoteList, noteRemove, noteRename, noteUpsert, reorderNote } from './api';
import { NoteConfigState, NoteRecord } from './types';

export interface IUseNoteConfig {
    keyword?: string;
    setKeyword: (keyword?: string) => void;
    noteList: Array<NoteRecord>;
    reload: () => Promise<void>;
    create: (newRecord: NoteRecord) => Promise<Response<number> | undefined>;
    rename: (name: string, newName: string) => Promise<NoteRecord | undefined>;
    remove: (name: string) => Promise<Response<string>>;
    reorder: (activeName: string, overName: string) => void;
    isNoteExist: (templateName: string) => boolean;
    fetchStatus: FetchStatus | undefined;
}

const REDUX_KEY = 'noteConfigState';
let isInitialized = false;
const useNoteConfig = () => {
    const { showNotice } = useNotification();
    const { getText } = useLocalization();
    const { isReadonly } = usePermissions();

    const { state, setState, updateState } = useRedux<NoteConfigState>(REDUX_KEY, {
        fetchStatus: 'None',
        noteList: [],
    });
    const { noteList, keyword, fetchStatus } = state;

    const getErrorContent = (ex: unknown) => {
        const content = queryErrorMessage(ex);
        return getText(content);
    };
    const setKeyword = (keyword?: string) => {
        updateState({ keyword });
    };
    const setFetchStatus = (fetchStatus: FetchStatus) => {
        updateState({ fetchStatus });
    };
    const fetchNoteConfig = async (reload?: boolean) => {
        if (fetchStatus !== 'None' && !reload) {
            return;
        }
        try {
            setFetchStatus('Pending');
            const resp = await getNoteList();
            setState({ noteList: resp.data });
            setFetchStatus('Success');
        } catch (ex) {
            const content = getErrorContent(ex);
            setFetchStatus('Error');
            showNotice({ content, type: 'error' });
        }
    };

    const reload = async () => {
        return await fetchNoteConfig(true);
    };

    const create = async (newRecord: NoteRecord) => {
        try {
            if (isNoteExist(newRecord.name)) {
                showNotice({ content: '该名称已存在，请更换名称', type: 'error' });
                return;
            }
            return await noteUpsert(newRecord);
        } catch (ex) {
            const content = getErrorContent(ex);
            showNotice({ content, type: 'error' });
        }
    };
    const rename = async (name: string, newName: string) => {
        try {
            if (isNoteExist(newName)) {
                showNotice({ content: '该名称已存在，请更换名称！', type: 'error' });
                return;
            }
            const resp = await noteRename(name, newName);
            return resp.data;
        } catch (ex) {
            const content = getErrorContent(ex);
            showNotice({ content, type: 'error' });
        }
    };

    const remove = async (name: string) => {
        try {
            const resp = await noteRemove(name);
            await reload();
            return resp;
        } catch (ex) {
            const content = getErrorContent(ex);
            showNotice({ content, type: 'error' });
        }
    };

    const reorder = (activeName: string, overName: string) => {
        if (!isReadonly) {
            reorderNote(activeName, overName).catch(() => void 0);
        }

        const activeIndex = noteList.findIndex((item) => item.name === activeName);
        const overIndex = noteList.findIndex((item) => item.name === overName);

        const newList = noteList.slice();

        newList.splice(
            overIndex < 0 ? newList.length + overIndex : overIndex,
            0,
            newList.splice(activeIndex, 1)[0],
        );
        updateState({ noteList: newList });
    };

    const isNoteExist = (templateName: string) => {
        return noteList.some((item) => item.name === templateName);
    };
    useEffect(() => {
        if (!isInitialized) {
            isInitialized = true;
            fetchNoteConfig();
        }
    }, []);

    const filteredList = useMemo(() => {
        if (keyword) {
            const searchKeyword = keyword.toLocaleLowerCase();
            return noteList.filter((item) => {
                if (item.keyword && item.keyword.length > 0) {
                    return item.keyword.toLocaleLowerCase().includes(searchKeyword);
                }
                return item.name?.toLocaleLowerCase()?.includes(searchKeyword);
            });
        }
        return noteList;
    }, [noteList, keyword]);

    return {
        fetchStatus,
        keyword,
        noteList: filteredList,
        reload,
        create,
        rename,
        remove,
        reorder,
        setKeyword,
        isNoteExist,
    } as IUseNoteConfig;
};

export default useNoteConfig;
