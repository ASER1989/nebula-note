import React from 'react';
import { useNotification } from '@client/components/notificationBox';
import { useLocalization } from '@client/localizations/useLocalization';
import { useNoteConfig } from '@client/models/noteModel';
import * as noteApi from '@client/models/noteModel/api';
import { usePermissions } from '@client/models/permissions/usePermissions';
import { BuildResult } from '@client/modules/noteList/buildReuslt';
import useNote, { NoteState } from '@client/modules/noteList/useNote';
import { queryErrorMessage } from '@client/utils/queries';
import { SplitPanel } from '@nebula-note/ui';
import { Content } from './content';
import CreateForm from './createForm';
import { List } from './list';

export const NoteList = () => {
    const { reload } = useNoteConfig();
    const { showNotice } = useNotification();
    const { state, getStateSync, setNoteSaved, setCreateFormShown } = useNote();
    const { isReadonly } = usePermissions();
    const { getText } = useLocalization();

    const handleSave = async () => {
        if (isReadonly) {
            console.log('isReadonly');
            showNotice({
                content: getText(
                    '当前为预览模式，内容无法保存，如需体验完整功能请下载安装桌面版',
                ),
                type: 'info',
                duration: 500000,
            });
            return;
        }
        try {
            const syncState = getStateSync();
            const resp = await noteApi.noteUpsert(syncState.note);
            setNoteSaved({ version: resp.data });
            await reload();
        } catch (ex) {
            showNotice({ content: queryErrorMessage(ex), type: 'error' });
        }
    };

    const handleCreateDialogClose = async (success?: boolean) => {
        if (success) {
            await reload();
        }
        setCreateFormShown(false);
    };

    return (
        <>
            <SplitPanel percentage={20} minWidth={270} dividerWidth={1}>
                <List state={state as NoteState} onSave={handleSave} />
                <Content state={state as NoteState} onSave={handleSave} />
            </SplitPanel>
            <CreateForm
                visible={state?.isCreateFormShown}
                onHide={handleCreateDialogClose}
            />
            <BuildResult />
        </>
    );
};

export default NoteList;
