import { useContext, useRef } from 'react';
import { ConfirmContext } from '@client/components/confirmBox';
import { useNotification } from '@client/components/notificationBox';
import { useLocalization } from '@client/localizations/useLocalization';
import { useNoteConfig } from '@client/models/noteModel';
import * as noteApi from '@client/models/noteModel/api';
import { NoteRecord } from '@client/models/noteModel/types';
import { usePermissions } from '@client/models/permissions/usePermissions';
import useNote from '@client/modules/noteList/useNote';
import { queryErrorMessage } from '@client/utils/queries';

export const useNoteController = () => {
    const actions = useNote();
    const isWaitingToSave = useRef(false);
    const { showNotice } = useNotification();
    const { isReadonly } = usePermissions();
    const { getText } = useLocalization();
    const { showConfirm } = useContext(ConfirmContext);
    const { reload } = useNoteConfig();

    const changeSelectedItem = async (templateConfig: NoteRecord) => {
        try {
            // 请求模板文档
            const documentResp = await noteApi.getNoteDocument(
                templateConfig.filePath as string,
            );
            actions.setNoteSync({ ...templateConfig, document: documentResp.data });
            // 请求模板元数据
            const metaResp = await noteApi.getNoteMeta(templateConfig.filePath as string);
            actions.setMeta(metaResp.data ?? '{}');

            // 遍历 templateList 并请求每个片段的内容
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
            actions.setFetchStatus('Success');
        } catch (error) {
            actions.setFetchStatus('Error');
            return queryErrorMessage(error);
        }
    };

    const save = async (replace?: boolean) => {
        try {
            const syncState = actions.getStateSync();
            if (syncState.fetchStatus === 'Pending') {
                isWaitingToSave.current = true;
                return;
            }
            actions.setFetchStatus('Pending');

            const resp = await noteApi.noteUpsert({ ...syncState.note, replace });
            actions.setNoteSaved({ version: resp.data });
            actions.setFetchStatus('Success');
            if (isWaitingToSave.current) {
                isWaitingToSave.current = false;
                await save();
            }
        } catch (ex) {
            actions.setFetchStatus('Success');
            const message = queryErrorMessage(ex);
            if (message === '版本号不一致') {
                showConfirm({
                    content: getText(message),
                    confirmText: getText('继续保存'),
                    cancelText: getText('放弃修改'),
                    callback: async (confirm) => {
                        if (confirm) {
                            await save(true);
                        }
                        await reload();
                    },
                });
            } else {
                showNotice({ content: queryErrorMessage(ex), type: 'error' });
            }
        }
    };

    const onSave = async () => {
        if (isReadonly) {
            showNotice({
                content: getText(
                    '当前为预览模式，内容无法保存，如需体验完整功能请下载安装桌面版',
                ),
                type: 'info',
                duration: 30000,
            });
            return;
        }
        await save();
    };

    const onImageUpload = async (file: File, filePath?: string) => {
        if (isReadonly) {
            return URL.createObjectURL(file);
        }
        const resp = await noteApi.imageUpload(file, { filePath });
        if (resp?.success) {
            return resp.data;
        }
        return undefined;
    };

    return { changeSelectedItem, onSave, onImageUpload };
};

export default useNoteController;
