import React, { useState, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import CodeEditor from '@client/components/codeEditor';

// 自定义Props接口
export type Props = {
    initialMarkdown?: string; // 初始Markdown内容
    onChange?: (content: string) => void;
};

const MarkdownEditor: React.FC<Props> = ({ initialMarkdown = '', onChange }) => {
    const [markdownContent, setMarkdownContent] = useState<string>(initialMarkdown);
    const [isEditing, setIsEditing] = useState<boolean>(true); // 编辑和展示模式的状态

    // 切换编辑和展示模式
    const toggleEditMode = () => setIsEditing((prev) => !prev);

    // 编辑时的内容更新
    const handleEditorChange = useCallback(
        (value: string) => {
            setMarkdownContent(value);
            onChange?.(value);
        },
        [onChange],
    );

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <div>
                <button
                    onClick={toggleEditMode}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: '#007BFF',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                        marginBottom: '20px',
                    }}
                >
                    {isEditing ? 'Switch to Preview' : 'Switch to Edit'}
                </button>
            </div>

            {isEditing ? (
                <CodeEditor
                    value={markdownContent}
                    onChange={handleEditorChange}
                    showHeader={false}
                    lang='markdown'
                    lineNumbers={false}
                />
            ) : (
                <ReactMarkdown>{markdownContent}</ReactMarkdown>
            )}
        </div>
    );
};

export default MarkdownEditor;
