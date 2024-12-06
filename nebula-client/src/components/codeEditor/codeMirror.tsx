import './index.styl';
import React, { useMemo, useState } from 'react';
import Dropdown, { DropdownOption } from '@client/atoms/dropdown';
import * as events from '@uiw/codemirror-extensions-events';
import { langs } from '@uiw/codemirror-extensions-langs';
import { githubLight } from '@uiw/codemirror-theme-github';
import CodeMirror, { ReactCodeMirrorProps } from '@uiw/react-codemirror';
import classNames from 'classnames';
import _ from 'lodash';
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from 'react-icons/ai';
import { SupportedLang, getLangOptions } from './queries';

export interface Props extends ReactCodeMirrorProps {
    title?: string;
    showExpand?: boolean;
    showHeader?: boolean;
    lang?: (typeof SupportedLang)[number];
    disableLangChange?: boolean;
    onLangChange?: (lang: (typeof SupportedLang)[number]) => void;
    onSave?: () => void;
}

export default function CodeEditor(props: Props) {
    const {
        title,
        showExpand,
        showHeader = true,
        lang = 'tsx',
        disableLangChange = false,
        onLangChange,
        onSave,
    } = props;

    const [langTemplate, setLangTemplate] = useState<keyof typeof langs>(lang);
    const [isFullScreenEditor, setIsFullScreenEditor] = useState(false);
    const handleEditorSizeChange = () => {
        setIsFullScreenEditor(() => !isFullScreenEditor);
    };

    const langExtension = useMemo(() => {
        if (langs[langTemplate]) {
            return langs[langTemplate]?.();
        }
        return langs.tsx();
    }, [langTemplate]);

    const handleLangTemplateChange = (
        option: DropdownOption<(typeof SupportedLang)[number]>,
    ) => {
        setLangTemplate(option.value);
        onLangChange?.(option.value);
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
        'disableLangChange',
        'onSave',
        'onLangChange',
    ]);

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
                                    disabled={disableLangChange}
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
                <CodeMirror
                    {...resetProps}
                    extensions={[langExtension, eventExt]}
                    theme={githubLight}
                />
            </div>
        </div>
    );
}
