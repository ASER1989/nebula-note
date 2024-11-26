import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from '@client/modules/snippetList/storeSlice';
import * as templateApi from '@client/models/template/api';
import { TemplateRecord } from '@client/models/template/types';
import { queryErrorMessage } from '@client/utils/queries';

// 异步 thunk
export const changeSelectedItem = createAsyncThunk(
    'template/changeSelectedItem',
    async (templateConfig: TemplateRecord, thunkAPI) => {
        const { dispatch } = thunkAPI;

        // 更新模板路径
        dispatch(actions.setTemplateFilePath(templateConfig));

        try {
            // 请求模板文档
            const documentResp = await templateApi.getTemplateDocument(
                templateConfig.filePath as string,
            );
            dispatch(actions.setTemplateDocument(documentResp.data));

            // 请求模板元数据
            const metaResp = await templateApi.getTemplateMeta(
                templateConfig.filePath as string,
            );
            dispatch(actions.setTemplateMeta(metaResp.data ?? '{}'));

            // 遍历 snippetList 并请求每个片段的内容
            if (templateConfig.snippetList) {
                for (const snippet of templateConfig.snippetList) {
                    const snippetResp = await templateApi.getTemplateContent(
                        templateConfig.filePath!,
                        snippet.title,
                    );
                    const newSnippet = {
                        ...snippet,
                        content: snippetResp.data,
                    };
                    dispatch(actions.setSnippetContent(newSnippet));
                }
            }
        } catch (error) {
            const content = queryErrorMessage(error);
            return thunkAPI.rejectWithValue(content || 'An error occurred');
        }
    },
);
