import React, {FC, useState} from 'react';
import _ from 'lodash';
import '../index.styl';
import {Tabs, TabPane, TabOption} from '@client/molecules/tabs';
import {actions, SliceType} from '@client/modules/noteList/storeSlice';
import CodeEditor from '@client/components/codeEditor';
import type {Props as EditorProps} from '@client/components/codeEditor';
import MarkdownEditor from '@client/components/markdownEditor';
import ShortcutKeys from '@client/modules/shortcutKeys';
import {useDispatch} from 'react-redux';
import {Stack, StackItem} from '@client/molecules/stack';
import {LuPencilLine} from 'react-icons/lu';
import classNames from 'classnames';
import {EditableContent} from '@client/atoms/editableContent';
import useMessage from '@client/components/message/useMessage';

export type Props = {
  state: SliceType;
  onSave?: () => void;
};
export const Content: FC<Props> = ({state, onSave}) => {
  const dispatch = useDispatch();
  const {showMessage} = useMessage();
  const [titleFocus, setTitleFocus] = useState(false);

  const handleDocumentChange = (value?: string) => {
    dispatch(actions.updateTemplateDocument(value));
  };
  const handleContentChange = (editorValue: string, index: number) => {
    dispatch(actions.updateSnippet({template: {content: editorValue}, index}));
  };

  const handleMetaChange = (editorValue: string) => {
    dispatch(actions.updateTemplateMeta(editorValue));
  };
  const handleCodeLangChange = (language: EditorProps['lang'], index: number) => {
    dispatch(actions.updateSnippet({template: {language}, index}));
  };
  const handleTabChange = (tabId: string) => {
    dispatch(actions.setActiveProperty(tabId));
  };
  const handleAddSnippet = () => {
    dispatch(actions.addSnippet({title: ''}));
    handleTabChange(`code_${state.note?.templateList?.length ?? 1 - 1}`);
  };
  const handleRemoveSnippet = (index: number) => {
    dispatch(actions.removeSnippet({index}));
    handleTabChange(index === 0 ? 'meta' : `code_${index - 1}`);
  };

  const handleTabTitleChange = (title: string, newTitle: string) => {
    if (title !== newTitle) {
      const isExist = state.note?.templateList?.some(
        (template) => template.title === newTitle,
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
        state.note?.templateList?.findIndex(
          (template) => template.title === title,
        ) ?? -1;
      dispatch(actions.updateSnippet({template: {title: newTitle}, index}));
    }
  };

  const tabsRender = (option: TabOption, isActive: boolean) => {
    const editable = !['document', 'meta'].includes(option.id) && isActive;
    const className = classNames('note-tabs-title', {editable: editable});
    return (
      <div className={className}>
        <Stack align='flex-end'>
          {editable ? (
            <StackItem>
              <LuPencilLine size={10}/>
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
        onPlusClick={handleAddSnippet}
        labelRender={tabsRender}
        onTabChange={handleTabChange}
        activePaneId={state?.note?.activeProperty ?? 'document'}
      >
        <TabPane id='document' key='document' title='文档'>
          <MarkdownEditor onChange={handleDocumentChange} preview='preview'>
            {state?.note?.document}
          </MarkdownEditor>
        </TabPane>
        <TabPane id='meta' key='meta' title='参数配置'>
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
