import { useMemo, useEffect } from 'react';
import useMessage from '@client/components/message/useMessage';
import { getNoteList, noteRename } from './api';
import { NoteConfigState, NoteRecord } from './types';
import { useRedux } from '@client/store/hooks/useRedux';
import { FetchStatus } from '@client/types';
import { queryErrorMessage } from '@client/utils/queries';

export interface IUseNoteConfig {
    keyword?: string;
    setKeyword: (keyword?: string) => void;
    noteList: Array<NoteRecord>;
    reload: () => Promise<void>;
    // create: () => void;
    rename: (name: string, newName: string) => Promise<NoteRecord | undefined>;
    isNoteExist: (templateName: string) => boolean;
}

let isInitialized = false;
const useNoteConfig: () => IUseNoteConfig = () => {
    const { showMessage } = useMessage();
    const [templateState, setTemplateState, updateTemplateState] =
        useRedux<NoteConfigState>('noteConfig', {
            fetchStatus: 'None',
            noteList: [],
        });
    const { noteList, keyword, fetchStatus } = templateState;
    const setKeyword = (keyword?: string) => {
        updateTemplateState({ keyword });
    };
    const setFetchStatus = (fetchStatus: FetchStatus) => {
        updateTemplateState({ fetchStatus });
    };
    const setTemplateConfig = (templateConfig: Array<NoteRecord>) => {
        setTemplateState({ noteList: templateConfig });
    };

    const fetchNoteConfig = async (reload?: boolean) => {
        if (fetchStatus !== 'None' && !reload) {
            return;
        }
        try {
            setFetchStatus('Pending');
            const resp = await getNoteList();

            if (!resp.success) {
                setFetchStatus('Error');
                showMessage(resp.error?.toString() ?? '发生未知错误，Schema拉取失败！');
                return;
            }

            setTemplateConfig(resp.data);
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

    const rename = async (name: string, newName: string) => {
        try {
            if (isNoteExist(newName)) {
                throw new Error('该名称已存在，请更换名称！');
            }
            const resp = await noteRename(name, newName);
            if (!resp.success) {
                throw new Error(resp.error?.toString() ?? '发生未知错误，重命名失败！');
            }
            return resp.data;
        } catch (ex) {
            const content = queryErrorMessage(ex);
            await showMessage(content);
        }
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
        noteList: filteredList,
        reload,
        rename,
        keyword,
        setKeyword,
        isNoteExist,
    };
};

export default useNoteConfig;
