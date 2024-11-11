import React, { useState } from 'react';
import { List } from './list';
import { Content } from './content';
import ResizableSplit from '@client/molecules/resizableSplit';
import { useTemplateConfig } from '@client/models/template';
import SaveForm from '@client/modules/_shared/template/saveForm';
import { Dialog } from '@client/molecules/dialog';
import { useReduxSlice } from '@client/store/hooks/useReduxSlice';
import {
    reducer,
    saveTemplateAction,
    sliceName,
    SliceType,
} from '@client/modules/snippetList/storeSlice';

export const SnippetList = () => {
    const { templateConfig } = useTemplateConfig();
    const [state, dispatch] = useReduxSlice({ key: sliceName, reducer });
    const [saveShown, setSaveShown] = useState(false);
    const handleSaveShown = () => {
        setSaveShown(true);
    };
    const handleSaveClose = (success: boolean) => {
        if (success) {
            dispatch(saveTemplateAction());
        }
        setSaveShown(false);
    };

    return (
        <>
            <ResizableSplit percentage={20} minWidth={270}>
                <List
                    state={state as SliceType}
                    templateList={templateConfig}
                    onSave={handleSaveShown}
                />
                <Content state={state as SliceType} onSave={handleSaveShown} />
            </ResizableSplit>
            <Dialog visible={saveShown} onClose={() => setSaveShown(false)} title='模板'>
                <SaveForm
                    templateOption={{
                        ...state?.template,
                        filePath: state?.template?.filePath,
                        content: state?.template?.content,
                        document: state?.template?.document,
                    }}
                    onClose={handleSaveClose}
                />
            </Dialog>
        </>
    );
};

export default SnippetList;
