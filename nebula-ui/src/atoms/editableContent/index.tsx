import './index.styl';
import React, { FC, useEffect, useRef } from 'react';
import classNames from 'classnames';

export type EditableContentProps = {
    children: string | TrustedHTML;
    editable: boolean;
    focus?: boolean;
    allowEnter?: boolean;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onFocus?: (e: React.FormEvent<HTMLDivElement>) => void;
    onChange?: (newText: string, newHtml: string) => void;
    onBlur?: (newText: string, newHtml: string) => void;
    ['data-test-id']?: string;
};

export const EditableContent: FC<EditableContentProps> = ({
    children,
    editable,
    allowEnter = false,
    className,
    focus,
    onClick,
    onFocus,
    onChange,
    onBlur,
    'data-test-id': dataTestId,
}) => {
    const boxRef = useRef<HTMLDivElement>(null);
    const classnames = classNames('nebula-editable-content', className);

    useEffect(() => {
        if (boxRef.current && focus) {
            boxRef.current.focus();
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(boxRef.current);
            range.collapse(false);
            selection?.removeAllRanges();
            selection?.addRange(range);
        }
    }, [focus]);

    useEffect(() => {
        const enterListener = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                e.preventDefault();
            }
        };
        if (boxRef.current && !allowEnter) {
            boxRef.current.addEventListener('keydown', enterListener);
        }
        return () => {
            boxRef.current?.removeEventListener('keydown', enterListener);
        };
    }, [allowEnter]);
    const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
        const newText = e.currentTarget.innerText.replace(/\n/g, '');
        const newHtml = e.currentTarget.innerText;
        onChange?.(newText, newHtml);
    };
    const handleBlur = (e: React.FormEvent<HTMLDivElement>) => {
        const newText = e.currentTarget.innerText.replace(/\n/g, '');
        const newHtml = e.currentTarget.innerHTML;
        onBlur?.(newText, newHtml);
    };
    return (
        <div
            ref={boxRef}
            className={classnames}
            contentEditable={editable}
            onInput={handleContentChange}
            onBlur={handleBlur}
            onFocus={onFocus}
            onClick={onClick}
            dangerouslySetInnerHTML={{ __html: children }}
            data-test-id={dataTestId}
        />
    );
};

export default EditableContent;
