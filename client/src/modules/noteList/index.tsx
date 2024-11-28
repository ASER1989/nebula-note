import React, { useState } from 'react';
import { List } from './list';
import { Content } from './content';
import { useNoteConfig } from '@client/models/noteModel';
import NewNotebookDialog from './newNotebookDialog';
import { useReduxSlice } from '@client/store/hooks/useReduxSlice';
import {
    actions,
    reducer,
    sliceName,
    SliceType,
} from '@client/modules/noteList/storeSlice';
import SplitPanel from '@client/molecules/splitPanel';
import * as noteApi from '@client/models/noteModel/api';
import useMessage from '@client/components/message/useMessage';
import { SnippetListContext } from '@client/modules/noteList/context';

export const NoteList = () => {
    const { reloadTemplateConfig } = useNoteConfig();
    const { showMessage } = useMessage();
    const [state, dispatch] = useReduxSlice({ key: sliceName, reducer });
    const [saveShown, setSaveShown] = useState(false);

    const handleSave = async () => {
        const resp = await noteApi.noteUpsert(state.note);
        if (resp.success) {
            dispatch(actions.templateSaved({ version: resp.data }));
            await reloadTemplateConfig();
            return showMessage('保存成功！');
        }
        await showMessage(resp.error.toString());
    };
    const handleSaveShown = () => {
        setSaveShown(true);
    };

    const handleCreateDialogClose = async (success?: boolean) => {
        if (success) {
            await reloadTemplateConfig();
        }
        setSaveShown(false);
    };

    return (
        <SnippetListContext.Provider
            value={{
                createSnippet: handleSaveShown,
            }}
        >
            <SplitPanel percentage={20} minWidth={270} dividerWidth={1}>
                <List state={state as SliceType} onSave={handleSave} />
                <Content state={state as SliceType} onSave={handleSave} />
            </SplitPanel>
            <NewNotebookDialog visible={saveShown} onHide={handleCreateDialogClose} />
        </SnippetListContext.Provider>
    );
};

export default NoteList;
