import { useEffect, useMemo } from 'react';
import { useMessage } from '@client/components/messageBox';
import { useRedux } from '@client/store/hooks/useRedux';
import { FetchStatus } from '@client/types';
import { queryErrorMessage } from '@client/utils/queries';
import { Response } from '@client/utils/request';
import { getNoteList, noteRemove, noteRename, noteUpsert } from './api';
import { NoteConfigState, NoteRecord } from './types';

export interface IUseNoteConfig {
    keyword?: string;
    setKeyword: (keyword?: string) => void;
    noteList: Array<NoteRecord>;
    reload: () => Promise<void>;
    create: (newRecord: NoteRecord) => Promise<Response<number> | undefined>;
    rename: (name: string, newName: string) => Promise<NoteRecord | undefined>;
    remove: (name: string) => Promise<Response<string>>;
    isNoteExist: (templateName: string) => boolean;
    fetchStatus: FetchStatus | undefined;
}

const REDUX_KEY = 'noteConfigState';
let isInitialized = false;
const useNoteConfig: () => IUseNoteConfig = () => {
    const { showMessage } = useMessage();
    const { state, setState, updateState } = useRedux<NoteConfigState>(REDUX_KEY, {
        fetchStatus: 'None',
        noteList: [],
    });
    const { noteList, keyword, fetchStatus } = state;
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
            const content = queryErrorMessage(ex);
            setFetchStatus('Error');
            showMessage(content);
        }
    };

    const reload = async () => {
        return await fetchNoteConfig(true);
    };

    const create = async (newRecord: NoteRecord) => {
        try {
            if (isNoteExist(newRecord.name)) {
                return;
            }
            return await noteUpsert(newRecord);
        } catch (ex) {
            const content = queryErrorMessage(ex);
            await showMessage(content);
        }
    };
    const rename = async (name: string, newName: string) => {
        try {
            if (isNoteExist(newName)) {
                throw new Error('该名称已存在，请更换名称！');
            }
            const resp = await noteRename(name, newName);
            return resp.data;
        } catch (ex) {
            const content = queryErrorMessage(ex);
            await showMessage(content);
        }
    };

    const remove = async (name: string) => {
        const result = await noteRemove(name);
        await reload();
        return result;
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
        setKeyword,
        isNoteExist,
    };
};

export default useNoteConfig;
