import React, { useState } from 'react';
import { Tabs, TabPane } from '@client/molecules/tabs';
import { useReduxSlice } from '@client/store/hooks/useReduxSlice';
import {
    reducer,
    sliceName,
    updateTemplateContentAction,
    updateTemplateMetaAction,
    setTemplateLanguageAction,
    updateTemplateDocumentAction,
} from '@client/modules/snippetList/storeSlice';
import CodeEditor from '@client/components/codeEditor';
import type { Props as EditorProps } from '@client/components/codeEditor';
import { Dialog } from '@client/molecules/dialog';
import SaveForm from '@client/modules/_shared/template/saveForm';
import MarkdownEditor from '@client/components/markdownEditor';
import ShortcutKeys from '@client/modules/shortcutKeys';

export const Content = () => {
    const [state, dispatch] = useReduxSlice({ key: sliceName, reducer });
    const [saveShown, setSaveShown] = useState(false);

    const handleSaveShown = () => {
        setSaveShown(true);
    };
    const handleSaveClose = () => {
        setSaveShown(false);
    };

    const handleDocumentChange = (value?: string) => {
        dispatch(updateTemplateDocumentAction(value));
    };
    const handleContentChange = (editorValue: string) => {
        dispatch(updateTemplateContentAction(editorValue));
    };

    const handleMetaChange = (editorValue: string) => {
        dispatch(updateTemplateMetaAction(editorValue));
    };
    const handleCodeLangChange = (lang: EditorProps['lang']) => {
        dispatch(setTemplateLanguageAction(lang));
    };

    return (
        <>
            <ShortcutKeys onSave={handleSaveShown}>
                <Tabs>
                    <TabPane key='readme' title='模板介绍'>
                        <MarkdownEditor onChange={handleDocumentChange} preview='preview'>
                            {state?.template?.document}
                        </MarkdownEditor>
                    </TabPane>
                    <TabPane id='code' key='code' title='模板编辑'>
                        <CodeEditor
                            value={state?.template?.content}
                            onChange={handleContentChange}
                            onLangChange={handleCodeLangChange}
                        />
                    </TabPane>
                    <TabPane id='meta' key='meta' title='模板运行参数配置'>
                        <CodeEditor
                            value={state?.template?.meta ?? '{}'}
                            lang='json'
                            disableLangChange
                            onChange={handleMetaChange}
                        />
                    </TabPane>
                </Tabs>
            </ShortcutKeys>
            <Dialog visible={saveShown} onClose={() => setSaveShown(false)} title='模板'>
                <SaveForm
                    templateOption={{
                        ...state?.template,
                        filePath: state?.template?.filePath,
                        content: state?.template?.content,
                        document:state?.template?.document
                    }}
                    onClose={handleSaveClose}
                />
            </Dialog>
        </>
    );
};
