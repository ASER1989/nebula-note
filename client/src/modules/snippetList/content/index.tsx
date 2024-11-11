import React, { FC } from 'react';
import { Tabs, TabPane } from '@client/molecules/tabs';
import {
    updateTemplateContentAction,
    updateTemplateMetaAction,
    setTemplateLanguageAction,
    updateTemplateDocumentAction,
    SliceType,
} from '@client/modules/snippetList/storeSlice';
import CodeEditor from '@client/components/codeEditor';
import type { Props as EditorProps } from '@client/components/codeEditor';
import MarkdownEditor from '@client/components/markdownEditor';
import ShortcutKeys from '@client/modules/shortcutKeys';
import { useDispatch } from 'react-redux';

export type Props = {
    state: SliceType;
    onSave?: () => void;
};
export const Content: FC<Props> = ({ state,onSave }) => {
    const dispatch = useDispatch();

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
        <ShortcutKeys onSave={onSave}>
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
    );
};
