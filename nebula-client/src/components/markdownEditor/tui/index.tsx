import './index.styl';
import React, { useEffect, useRef, useState } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

interface MarkdownEditorProps {
    children?: string;
    id: string;
    onChange?: (value: string) => void;
    height?: string;
    previewStyle?: 'tab' | 'vertical';
    isLoading: boolean;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
    children = '',
    id,
    onChange,
    previewStyle = 'vertical',
    isLoading,
}) => {
    const editorRef = useRef<Editor>(null);
    const idRef = useRef<string>(id);
    const isMounted = useRef(false);
    const [value, setValue] = useState(children);

    useEffect(() => {

        if (editorRef.current) {
            console.log('before init.....', children?.length, id,isLoading);
            if (!isLoading && idRef.current !== id && Boolean(id)) {
                console.log('init.....', children?.length, id);
                isMounted.current = true;
                idRef.current = id;
                editorRef.current.getInstance().blur();
                editorRef.current.getInstance().setMarkdown(children ?? '', false);
                editorRef.current.getInstance().setScrollTop(0);
            }
        }
    }, [children,isLoading,id]);

    useEffect(() => {
        if (isMounted.current) {
            isMounted.current = false;
            return;
        }
        if (value !== children) {
            console.log('change', value.length);
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

    return (
        <div className='nebula-tui'>
            <Editor
                ref={editorRef}
                initialValue={children}
                previewStyle={previewStyle}
                height='100%'
                initialEditType='wysiwyg'
                useCommandShortcut={false}
                onChange={handleChange}
            />
        </div>
    );
};

export default MarkdownEditor;
