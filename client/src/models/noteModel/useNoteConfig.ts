import { useMemo, useEffect } from 'react';
import useMessage from '@client/components/message/useMessage';
import { getNoteList } from './api';
import { NoteConfigState, NoteRecord } from './types';
import { useRedux } from '@client/store/hooks/useRedux';
import { FetchStatus } from '@client/types';
import { queryErrorMessage } from '@client/utils/queries';

export interface IUseNoteConfig {
    templateConfig: Array<NoteRecord>;
    reloadTemplateConfig: () => Promise<void>;
    templateKeyword?: string;
    setTemplateKeyword: (keyword?: string) => void;
    isTemplateExist: (templateName: string) => boolean;
}

let isInitialized = false;
const useNoteConfig: () => IUseNoteConfig = () => {
    const { showMessage } = useMessage();
    const [templateState, setTemplateState, updateTemplateState] =
        useRedux<NoteConfigState>('templateConfigState', {
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

    const fetchTemplateConfig = async (reload?: boolean) => {
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

    const reloadTemplateConfig = () => {
        return fetchTemplateConfig(true);
    };
    const filteredConfigs = useMemo(() => {
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

    const isTemplateExist = (templateName: string) => {
        return noteList.some((item) => item.name === templateName);
    };
    useEffect(() => {
        if (!isInitialized) {
            isInitialized = true;
            fetchTemplateConfig();
        }
    }, []);

    return {
        templateConfig: filteredConfigs,
        reloadTemplateConfig,
        templateKeyword: keyword,
        setTemplateKeyword: setKeyword,
        isTemplateExist,
    };
};

export default useNoteConfig;
