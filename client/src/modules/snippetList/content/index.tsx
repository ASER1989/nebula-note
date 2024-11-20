import React, { FC, useState } from 'react';
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
import { EditableContent } from '@client/atoms/editableContent';
import useMessage from '@client/components/message/useMessage';

export type Props = {
    state: SliceType;
    onSave?: () => void;
};
export const Content: FC<Props> = ({ state, onSave }) => {
    const dispatch = useDispatch();
    const { showMessage } = useMessage();
    const [activePaneId, setActivePaneId] = useState('document');
    const [titleFocus, setTitleFocus] = useState(false);

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

    const handleAddSnippet = () => {
        dispatch(actions.addSnippet({ title: '' }));
        setActivePaneId(`code_${state.template?.snippetList?.length ?? 1 - 1}`);
    };
    const handleRemoveSnippet = (index: number) => {
        dispatch(actions.removeSnippet({ index }));
        setActivePaneId(index === 0 ? 'meta' : `code_${index - 1}`);
    };

    const handleTabTitleChange = (title: string, newTitle: string) => {
        if (title !== newTitle) {
            const isExist = state.template?.snippetList?.some(
                (snippet) => snippet.title === newTitle,
            );
            if (isExist && !titleFocus) {
                return;
            }
            if (isExist) {
                setTitleFocus(false);
                return showMessage('snippet title is exist').then(() => {
                    setTitleFocus(true);
                });
            }
            const index =
                state.template?.snippetList?.findIndex(
                    (snippet) => snippet.title === title,
                ) ?? -1;
            dispatch(actions.updateSnippet({ snippet: { title: newTitle }, index }));
        }
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
                        <EditableContent
                            editable={editable}
                            focus={isActive && titleFocus}
                            className='snippet-editable-title'
                            onClick={() => setTitleFocus(isActive)}
                            onBlur={(newText) =>
                                handleTabTitleChange(option.label, newText)
                            }
                        >
                            {option.label}
                        </EditableContent>
                    </StackItem>
                </Stack>
            </div>
        );
    };
    return (
        <ShortcutKeys onSave={onSave}>
            <Tabs
                showPlus
                onPlusClick={handleAddSnippet}
                labelRender={tabsRender}
                activePaneId={activePaneId}
            >
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
                            onRemoveClick={() => handleRemoveSnippet(index)}
                        >
                            <CodeEditor
                                value={snippet?.content ?? ''}
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
