import React, { useState } from 'react';
import { List } from './list';
import { Content } from './content';
import { useTemplateConfig } from '@client/models/template';
import SaveForm from './saveForm';
import { Dialog } from '@client/molecules/dialog';
import { useReduxSlice } from '@client/store/hooks/useReduxSlice';
import {
    actions,
    reducer,
    sliceName,
    SliceType,
} from '@client/modules/snippetList/storeSlice';
import SplitPanel from '@client/molecules/splitPanel';
import * as TemplateApi from '@client/models/template/api';
import useMessage from '@client/components/message/useMessage';
import { SnippetListContext } from '@client/modules/snippetList/context';

export const SnippetList = () => {
    const { templateConfig, reloadTemplateConfig, templateKeyword, setTemplateKeyword } =
        useTemplateConfig();
    const { showMessage } = useMessage();
    const [state, dispatch] = useReduxSlice({ key: sliceName, reducer });
    const [saveShown, setSaveShown] = useState(false);

    const handleSave = () => {
        TemplateApi.saveTemplate(state.template).then((resp) => {
            if (resp.success) {
                dispatch(actions.templateSaved({ version: resp.data }));
                reloadTemplateConfig();
                return showMessage('保存成功！');
            }
            showMessage(resp.error.toString());
        });
    };
    const handleSaveShown = () => {
        setSaveShown(true);
    };

    const handleSaveClose = (success?: boolean) => {
        if (success) {
            reloadTemplateConfig();
        }
        setSaveShown(false);
    };

    return (
        <SnippetListContext.Provider
            value={{
                keyword: templateKeyword,
                setKeyword: setTemplateKeyword,
                createSnippet: handleSaveShown,
            }}
        >
            <SplitPanel percentage={20} minWidth={270} dividerWidth={1}>
                <List
                    state={state as SliceType}
                    templateList={templateConfig}
                    onSave={handleSave}
                />
                <Content state={state as SliceType} onSave={handleSave} />
            </SplitPanel>
            <SaveForm visible={saveShown} onHide={handleSaveClose} />
        </SnippetListContext.Provider>
    );
};

export default SnippetList;
