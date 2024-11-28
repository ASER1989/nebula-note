import React, { useState } from 'react';
import { List } from './list';
import { Content } from './content';
import { useTemplateConfig } from '@client/models/template';
import NewNotebookDialog from './newNotebookDialog';
import { useReduxSlice } from '@client/store/hooks/useReduxSlice';
import {
    actions,
    reducer,
    sliceName,
    SliceType,
} from '@client/modules/snippetList/storeSlice';
import SplitPanel from '@client/molecules/splitPanel';
import * as templateApi from '@client/models/template/api';
import useMessage from '@client/components/message/useMessage';
import { SnippetListContext } from '@client/modules/snippetList/context';

export const SnippetList = () => {
    const { reloadTemplateConfig } = useTemplateConfig();
    const { showMessage } = useMessage();
    const [state, dispatch] = useReduxSlice({ key: sliceName, reducer });
    const [saveShown, setSaveShown] = useState(false);

    const handleSave = async () => {
        const resp = await templateApi.saveTemplate(state.template);
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

export default SnippetList;
