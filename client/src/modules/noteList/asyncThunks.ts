import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from '@client/modules/noteList/storeSlice';
import * as noteApi from '@client/models/noteModel/api';
import { NoteRecord } from '@client/models/noteModel/types';
import { queryErrorMessage } from '@client/utils/queries';

// 异步 thunk
export const changeSelectedItem = createAsyncThunk(
    'template/changeSelectedItem',
    async (templateConfig: NoteRecord, thunkAPI) => {
        const { dispatch } = thunkAPI;

        // 更新模板路径
        dispatch(actions.setNote(templateConfig));

        try {
            // 请求模板文档
            const documentResp = await noteApi.getNoteDocument(
                templateConfig.filePath as string,
            );
            dispatch(actions.setDocument(documentResp.data));

            // 请求模板元数据
            const metaResp = await noteApi.getNoteMeta(
                templateConfig.filePath as string,
            );
            dispatch(actions.setMeta(metaResp.data ?? '{}'));

            // 遍历 snippetList 并请求每个片段的内容
            if (templateConfig.templateList) {
                for (const snippet of templateConfig.templateList) {
                    const snippetResp = await noteApi.getNoteContent(
                        templateConfig.filePath!,
                        snippet.title,
                    );
                    const newSnippet = {
                        ...snippet,
                        content: snippetResp.data,
                    };
                    dispatch(actions.setTemplateContent(newSnippet));
                }
            }
        } catch (error) {
            const content = queryErrorMessage(error);
            return thunkAPI.rejectWithValue(content || 'An error occurred');
        }
    },
);
