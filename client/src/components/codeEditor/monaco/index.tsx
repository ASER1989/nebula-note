import React, { useMemo, useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import MonacoEditor, { EditorProps, OnMount } from '@monaco-editor/react';
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from 'react-icons/ai';
import '../index.styl';
import Dropdown, { DropdownOption } from '@client/atoms/dropdown';
import { getLangOptions, SupportedLang } from '../queries';
import * as events from '@uiw/codemirror-extensions-events';
import _ from 'lodash';
import * as constants from '@client/components/codeEditor/monaco/constants';
import { useMonacoRegister } from './register';
import { editor } from 'monaco-editor';

type Props = EditorProps & {
    title?: string;
    showExpand?: boolean;
    showHeader?: boolean;
    lang?: (typeof SupportedLang)[number];
    onSave?: () => void;
};

export default function Monaco(props: Props) {
    const { value, title, showExpand, showHeader = true, lang = 'tsx', onSave } = props;

    const editorRef = useRef<editor.IStandaloneCodeEditor>(null);
    const [language, setLanguage] = useState<string>(lang);
    const [isFullScreenEditor, setIsFullScreenEditor] = useState(false);
    const monaco = useMonacoRegister();

    const handleEditorSizeChange = () => {
        setIsFullScreenEditor(() => !isFullScreenEditor);
    };

    useEffect(() => {
        // 根据内容或扩展名自动检测语言
        if (value?.includes('<%') && value?.includes('%>')) {
            setLanguage('ejs');
        } else if (value?.trim().startsWith('{')) {
            setLanguage('json');
        } else if (value?.includes('React') || value?.includes('TSX')) {
            setLanguage('tsx');
        } else {
            setLanguage('javascript');
        }
    }, [value]);
    // 当语言变化时手动应用到编辑器
    useEffect(() => {
        if (editorRef.current) {
            const model = editorRef.current.getModel();
            if (model) {
                monaco?.editor.setModelLanguage(model, language);
            }
        }
    }, [language, monaco]);

    const handleLangTemplateChange = (option: DropdownOption) => {
        setLanguage(option.value);
    };

    const eventExt = events.content({
        keydown: (e) => {
            if (
                e.keyCode == 83 &&
                (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)
            ) {
                e.preventDefault();
                onSave?.();
            }
        },
    });

    const resetProps = _.omit(props, [
        'title',
        'showExpand',
        'showHeader',
        'lang',
        'onSave',
    ]);

    const options = useMemo(() => {
        return _.defaults(props.options, constants.DefaultOptions);
    }, [props?.options]);

    const handleEditorMount: OnMount = (editor) => {
        editorRef.current = editor;
    };

    return (
        <div
            className={classNames('component-code-editor editor-container', {
                'full-screen': isFullScreenEditor,
            })}
        >
            {showHeader && (
                <div className='editor-header'>
                    <div title='这是一个编辑器，内容可以修改'>{title}</div>
                    <div className='editor-title-bars'>
                        <div className='editor-title-bar'>
                            <div className='lang-selector'>
                                <Dropdown
                                    options={getLangOptions()}
                                    size='tiny'
                                    value={lang}
                                    themeColor='#fff8dc'
                                    onChange={handleLangTemplateChange}
                                />
                            </div>
                        </div>
                        {showExpand && (
                            <div
                                className='editor-title-bar'
                                onClick={handleEditorSizeChange}
                            >
                                {isFullScreenEditor ? (
                                    <AiOutlineFullscreenExit />
                                ) : (
                                    <AiOutlineFullscreen />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
            <div className='editor-box'>
                <MonacoEditor
                    {...resetProps}
                    options={options}
                    language={language}
                    // extensions={[langExtension, eventExt]}
                    theme={language === 'ejs' ? 'ejsTheme' : 'vs-light'}
                    onMount={handleEditorMount}
                />
            </div>
        </div>
    );
}
