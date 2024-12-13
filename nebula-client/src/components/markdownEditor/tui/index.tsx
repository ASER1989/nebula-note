import './index.styl';
import React, { useEffect, useRef, useState } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import classNames from 'classnames';

interface MarkdownEditorProps {
    children?: string;
    id: string;
    isLoading: boolean;
    onChange?: (value: string) => void;
    height?: string;
    previewStyle?: 'tab' | 'vertical';
    placeholder?: string;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
    children = '',
    id,
    onChange,
    previewStyle = 'vertical',
    isLoading,
    placeholder,
}) => {
    const boxRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<Editor>(null);
    const idRef = useRef<string>(id);
    const isMounted = useRef(false);
    const [value, setValue] = useState(children);
    const [toolsVisible, setToolsVisible] = useState(false);

    useEffect(() => {
        if (editorRef.current) {
            if (!isLoading && idRef.current !== id && Boolean(id)) {
                isMounted.current = true;
                idRef.current = id;
                editorRef.current.getInstance().blur();
                editorRef.current.getInstance().setMarkdown(children ?? '', false);
                editorRef.current.getInstance().setScrollTop(0);
                setToolsVisible(false);
            }
        }
    }, [children, isLoading, id]);

    useEffect(() => {
        if (isMounted.current) {
            isMounted.current = false;
            return;
        }
        if (value !== children) {
            onChange?.(value);
        }
    }, [value]);

    const handleChange = () => {
        if (editorRef.current) {
            let markdownValue = editorRef.current.getInstance().getMarkdown();

            if (markdownValue.trim() === 'Write\nPreview\n\nMarkdown\nWYSIWYG') {
                markdownValue = '';
            }
            setValue(markdownValue);
        }
    };

    const handleEditorFocus = () => {
        setToolsVisible(true);
    };

    const boxClass = classNames('nebula-tui', { 'tui-tool-visible': toolsVisible });
console.log(placeholder)
    return (
        <div className={boxClass} ref={boxRef}>
            <Editor
                ref={editorRef}
                placeholder={placeholder}
                initialValue={children}
                previewStyle={previewStyle}
                height='100%'
                initialEditType='wysiwyg'
                useCommandShortcut={false}
                onChange={handleChange}
                onFocus={handleEditorFocus}
            />
        </div>
    );
};

export default MarkdownEditor;
