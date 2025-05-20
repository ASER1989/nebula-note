import React from 'react';
import { useNoteConfig } from '@client/models/noteModel';
import { BuildResult } from '@client/modules/noteList/buildReuslt';
import useNote, { NoteState } from '@client/modules/noteList/useNote';
import useNoteController from '@client/modules/noteList/useNoteController';
import { SplitPanel } from '@nebula-note/ui';
import { Content } from './content';
import CreateForm from './createForm';
import { List } from './list';

export const NoteList = () => {
    const { reload } = useNoteConfig();
    const { state, setCreateFormShown } = useNote();
    const { onSave } = useNoteController();

    const handleSave = async () => {
        await onSave();
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
