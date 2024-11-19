import React, { FC } from 'react';
import _ from 'lodash';
import '../index.styl';
import { Tabs, TabPane, TabOption } from '@client/molecules/tabs';
import { actions, SliceType } from '@client/modules/snippetList/storeSlice';
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
        dispatch(actions.updateTemplateDocument(value));
    };
    const handleContentChange = (editorValue: string, index: number) => {
        dispatch(actions.updateSnippet({ snippet: { content: editorValue }, index }));
    };

    const handleMetaChange = (editorValue: string) => {
        dispatch(actions.updateTemplateMeta(editorValue));
    };
    const handleCodeLangChange = (language: EditorProps['lang'], index: number) => {
        dispatch(actions.updateSnippet({ snippet: { language }, index }));
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
            <Tabs showPlus onPlusClick={handleAddSnippet} labelRender={tabsRender} activePaneId='code_0'>
                <TabPane id='docs' key='docs' title='模板介绍'>
                    <MarkdownEditor onChange={handleDocumentChange} preview='preview'>
                        {state?.template?.document}
                    </MarkdownEditor>
                </TabPane>
                <TabPane id='meta' key='meta' title='参数配置'>
                    <CodeEditor
                        value={state?.template?.meta ?? '{}'}
                        lang='json'
                        disableLangChange
                        onChange={handleMetaChange}
                    />
                </TabPane>
                {
                    (state?.template?.snippetList ?? []).map((snippet, index) => (
                        <TabPane
                            id={`code_${index}`}
                            key={`code_${index}`}
                            title={snippet.title}
                            removable
                        >
                            <CodeEditor
                                value={snippet?.content}
                                onChange={_.partial(handleContentChange, _, index)}
                                onLangChange={_.partial(handleCodeLangChange, _, index)}
                            />
                        </TabPane>
                    )) as never
                }
            </Tabs>
        </ShortcutKeys>
    );
};
