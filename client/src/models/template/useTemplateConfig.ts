import { useMemo, useEffect } from 'react';
import useMessage from '@client/components/message/useMessage';
import { getTemplateList } from '@client/models/template/api';
import { TemplateRecord } from '@client/models/template/types';
import { useRedux } from '@client/store/hooks/useRedux';
import { FetchStatus } from '@client/types';
import { queryErrorMessage } from '@client/utils/queries';

export type TemplateConfigState = {
    templateConfig: Array<TemplateRecord>;
    keyword?: string;
    fetchStatus?: FetchStatus;
};

let isInitialized = false;
const useTemplateConfig = () => {
    const { showMessage } = useMessage();
    const [templateState, , updateTemplateState] = useRedux<TemplateConfigState>(
        'templateConfigState',
        {
            fetchStatus: 'None',
            templateConfig: [],
        },
    );
    const { templateConfig, keyword, fetchStatus } = templateState;
    const setKeyword = (keyword?: string) => {
        updateTemplateState({ keyword });
    };
    const setFetchStatus = (fetchStatus: FetchStatus) => {
        updateTemplateState({ fetchStatus });
    };
    const setTemplateConfig = (templateConfig: Array<TemplateRecord>) => {
        updateTemplateState({ templateConfig });
    };

    const fetchTemplateConfig = async (reload?: boolean) => {
        if (fetchStatus !== 'None' && !reload) {
            return;
        }
        try {
            setFetchStatus('Pending');
            const resp = await getTemplateList();

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
            return templateConfig.filter((item) => {
                if (item.keyword && item.keyword.length > 0) {
                    return item.keyword.toLocaleLowerCase().includes(searchKeyword);
                }
                return item.name?.toLocaleLowerCase()?.includes(searchKeyword);
            });
        }
        return templateConfig;
    }, [templateConfig, keyword]);

    const isTemplateExist = (templateName: string) => {
        return templateConfig.some((item) => item.name === templateName);
    };
    useEffect(() => {
        if (!isInitialized) {
            isInitialized = true;
            fetchTemplateConfig();
        }
    }, []);

    return {
        fetchStatus,
        templateConfig: filteredConfigs,
        reloadTemplateConfig,
        templateKeyword: keyword,
        setTemplateKeyword: setKeyword,
        isTemplateExist,
    } as const;
};

export default useTemplateConfig;
