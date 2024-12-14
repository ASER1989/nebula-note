import '../index.styl';
import React, { FC, useState } from 'react';
import { EditableContent } from '@client/atoms/editableContent';
import type { Props as EditorProps } from '@client/components/codeEditor';
import CodeEditor from '@client/components/codeEditor';
import MarkdownEditor from '@client/components/markdownEditor';
import useMessage from '@client/components/message/useMessage';
import { useLocalization } from '@client/localizations/useLocalization';
import useSettings from '@client/models/settingsModel/useSettings';
import useNote, { NoteState } from '@client/modules/noteList/useNote';
import ShortcutKeys from '@client/modules/shortcutKeys';
import { Stack, StackItem } from '@client/molecules/stack';
import { TabOption, TabPane, Tabs } from '@client/molecules/tabs';
import useDebounce from '@client/utils/useDebounce';
import classNames from 'classnames';
import _ from 'lodash';
import { LuPencilLine } from 'react-icons/lu';

export type Props = {
    state: NoteState;
    onSave?: () => void;
};
export const Content: FC<Props> = ({ state, onSave }) => {
    const { settings } = useSettings();
    const { getText } = useLocalization();
    const { showMessage } = useMessage();
    const [titleFocus, setTitleFocus] = useState(false);
    const autoSaveInterceptor = useDebounce(() => onSave?.(), 500, 3000);
    const interceptorHandle = () => {
        if (settings?.autoSave) {
            autoSaveInterceptor();
        }
    };
    const actions = useNote(interceptorHandle);

    const handleDocumentChange = (value?: string) => {
        actions.updateDocument(value ?? '');
    };
    const handleContentChange = (editorValue: string, index: number) => {
        actions.updateTemplate({ template: { content: editorValue }, index });
    };

    const handleMetaChange = (editorValue: string) => {
        actions.updateMeta(editorValue);
    };
    const handleCodeLangChange = (language: EditorProps['lang'], index: number) => {
        actions.updateTemplate({ template: { language }, index });
    };
    const handleTabChange = (tabId: string) => {
        actions.setActiveProperty(tabId);
    };
    const handleAddTemplate = async () => {
        actions.addTemplate({ title: '' });
        handleTabChange(`code_${state.note?.templateList?.length ?? 0}`);
        setTitleFocus(true);
    };
    const handleRemoveTemplate = (index: number) => {
        actions.removeTemplate(index);
        const templateCount = state.note?.templateList?.length ?? 0;
        const nextIndex = index === templateCount - 1 ? index - 1 : index;
        handleTabChange(index === 0 ? 'meta' : `code_${nextIndex}`);
        setTitleFocus(false);
    };

    const handleTabTitleChange = (title: string, newTitle: string) => {
        setTitleFocus(false);
        if (_.isEmpty(newTitle)) {
            return showMessage(getText('无效标题')).then(() => {
                setTitleFocus(true);
            });
        }
        if (title !== newTitle) {
            const isExist = state.note?.templateList?.some(
                (template) => template.title === newTitle,
            );
            if (isExist && !titleFocus) {
                return;
            }
            if (isExist) {
                return showMessage(getText('模板名称已存在')).then(() => {
                    setTitleFocus(true);
                });
            }
            const index =
                state.note?.templateList?.findIndex(
                    (template) => template.title === title,
                ) ?? -1;
            actions.updateTemplate({ template: { title: newTitle }, index });
        }
    };

    const tabsRender = (option: TabOption, isActive: boolean) => {
        const editable = !['document', 'meta'].includes(option.id) && isActive;
        const className = classNames('note-tabs-title', { editable: editable });
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
                            className='note-editable-title'
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
                onPlusClick={handleAddTemplate}
                labelRender={tabsRender}
                onTabChange={handleTabChange}
                activePaneId={state?.activeProperty ?? 'document'}
            >
                <TabPane id='document' key='document' title={getText('文档')}>
                    <MarkdownEditor
                        onChange={handleDocumentChange}
                        id={state?.note?.name}
                        isLoading={state?.fetchStatus === 'Pending'}
                        placeholder={getText('点击添加文档内容')}
                    >
                        {state?.note?.document ?? '   '}
                    </MarkdownEditor>
                </TabPane>
                <TabPane id='meta' key='meta' title={getText('参数配置')}>
                    <CodeEditor
                        value={state?.note?.meta ?? '{}'}
                        lang='json'
                        disableLangChange
                        onChange={handleMetaChange}
                    />
                </TabPane>
                {
                    (state?.note?.templateList ?? []).map((snippet, index) => (
                        <TabPane
                            id={`code_${index}`}
                            key={`code_${index}`}
                            title={snippet.title}
                            onRemoveClick={() => handleRemoveTemplate(index)}
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
