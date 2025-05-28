import './index.styl';
import React, { useEffect, useRef, useState } from 'react';
import { useBoxSize } from '@client/utils/useBoxSize';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import classNames from 'classnames';

export interface MarkdownEditorProps {
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
    const { boxRef, boxSize } = useBoxSize();
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

    const widthRatioQuery = () => {
        const width = Number(boxSize.width.replace('px', ''));
        if (width) {
            return width >= 600 ? 1 : width / 600;
        }
        return 1;
    };
    const boxClass = classNames('nebula-tui', { 'tui-tool-visible': toolsVisible });
    const boxStyle = {
        '--nebula-tui-width-ratio': widthRatioQuery(),
    } as React.CSSProperties;

    return (
        <div className={boxClass} ref={boxRef} style={boxStyle}>
            <Editor
                ref={editorRef}
                placeholder={placeholder}
                initialValue={children}
                previewStyle={previewStyle}
                height='100%'
                initialEditType='wysiwyg'
                useCommandShortcut={true}
                onChange={handleChange}
                onFocus={handleEditorFocus}
            />
        </div>
    );
};

export default MarkdownEditor;
