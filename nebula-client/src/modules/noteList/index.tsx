import React from 'react';
import { useNotification } from '@client/components/notificationBox';
import { useNoteConfig } from '@client/models/noteModel';
import * as noteApi from '@client/models/noteModel/api';
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

    const handleSave = async () => {
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
