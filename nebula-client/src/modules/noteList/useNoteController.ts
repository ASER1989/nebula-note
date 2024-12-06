import * as noteApi from '@client/models/noteModel/api';
import { NoteRecord } from '@client/models/noteModel/types';
import { queryErrorMessage } from '@client/utils/queries';
import useNote from '@client/modules/noteList/useNote';

export const useNoteController = () => {
    const actions = useNote();
    const changeSelectedItem = async (templateConfig: NoteRecord) => {
        actions.setNote(templateConfig);

        try {
            // 请求模板文档
            const documentResp = await noteApi.getNoteDocument(
                templateConfig.filePath as string,
            );
            actions.setDocument(documentResp.data);

            // 请求模板元数据
            const metaResp = await noteApi.getNoteMeta(templateConfig.filePath as string);
            actions.setMeta(metaResp.data ?? '{}');

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
                    actions.setTemplateContent(newSnippet);
                }
            }
        } catch (error) {
            return queryErrorMessage(error);
        }
    };

    return { changeSelectedItem };
};

export default useNoteController;