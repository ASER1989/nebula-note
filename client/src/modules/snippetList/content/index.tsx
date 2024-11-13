import React, { FC } from 'react';
import '../index.styl';
import { Tabs, TabPane, TabOption } from '@client/molecules/tabs';
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
import { Stack, StackItem } from '@client/molecules/stack';
import { LuPencilLine } from 'react-icons/lu';
import classNames from 'classnames';

export type Props = {
    state: SliceType;
    onSave?: () => void;
};
export const Content: FC<Props> = ({ state, onSave }) => {
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

    const handleAddSnippet = () => {};

    const handleTabTitleChange = (event: React.FormEvent<HTMLDivElement>) => {
        const content = event.currentTarget.innerText;
    };

    const tabsRender = (option: TabOption, isActive: boolean) => {
        const editable = !['docs', 'meta'].includes(option.id) && isActive;
        const className = classNames('snippet-tabs-title', { editable: editable });
        return (
            <div className={className}>
                <Stack align='flex-end'>
                    {editable ? (
                        <StackItem>
                            <LuPencilLine size={10} />
                        </StackItem>
                    ) : (
                        <></>
                    )}
                    <StackItem>
                        <div
                            className='snippet-editable-title'
                            contentEditable={editable}
                            onInput={handleTabTitleChange}
                            dangerouslySetInnerHTML={{ __html: option.label }}
                        />
                    </StackItem>
                </Stack>
            </div>
        );
    };
    return (
        <ShortcutKeys onSave={onSave}>
            <Tabs showPlus onPlusClick={handleAddSnippet} labelRender={tabsRender}>
                <TabPane id='docs' key='docs' title='模板介绍'>
                    <MarkdownEditor onChange={handleDocumentChange} preview='preview'>
                        {state?.template?.document}
                    </MarkdownEditor>
                </TabPane>
                <TabPane id='meta' key='meta' title='模板运行参数配置'>
                    <CodeEditor
                        value={state?.template?.meta ?? '{}'}
                        lang='json'
                        disableLangChange
                        onChange={handleMetaChange}
                    />
                </TabPane>
                <TabPane id='code' key='code' title='模板编辑' removable>
                    <CodeEditor
                        value={state?.template?.content}
                        onChange={handleContentChange}
                        onLangChange={handleCodeLangChange}
                    />
                </TabPane>
            </Tabs>
        </ShortcutKeys>
    );
};
