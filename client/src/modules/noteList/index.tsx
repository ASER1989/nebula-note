import React from 'react';
import { List } from './list';
import { Content } from './content';
import { useNoteConfig } from '@client/models/noteModel';
import SplitPanel from '@client/molecules/splitPanel';
import * as noteApi from '@client/models/noteModel/api';
import useMessage from '@client/components/message/useMessage';
import CreateForm from './createForm';
import { BuildResult } from '@client/modules/noteList/buildReuslt';
import useNote, { NoteState } from '@client/modules/noteList/useNote';

export const NoteList = () => {
    const { reload } = useNoteConfig();
    const { showMessage } = useMessage();
    const { state, setNoteSaved, setCreateFormShown } = useNote();

    const handleSave = async () => {
        const resp = await noteApi.noteUpsert(state.note);
        if (resp.success) {
            setNoteSaved({ version: resp.data });
            await reload();
            return showMessage('保存成功！');
        }
        await showMessage(resp.error.toString());
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
