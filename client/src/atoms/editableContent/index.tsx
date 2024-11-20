import React, { useRef, FC, useEffect } from 'react';

export type Props = {
    children: string | TrustedHTML;
    editable: boolean;
    focus?: boolean;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onChange?: (newText: string, newHtml: string) => void;
    onBlur?: (newText: string, newHtml: string) => void;
};

export const EditableContent: FC<Props> = ({
    children,
    editable,
    className,
    focus,
    onClick,
    onChange,
    onBlur,
}) => {
    const boxRef = useRef<HTMLDivElement>(null);

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
    const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
        const newText = e.currentTarget.innerText;
        const newHtml = e.currentTarget.innerText;
        onChange?.(newText, newHtml);
    };
    const handleBlur = (e: React.FormEvent<HTMLDivElement>) => {
        const newText = e.currentTarget.innerText;
        const newHtml = e.currentTarget.innerHTML;
        onBlur?.(newText, newHtml);
    };
    return (
        <div
            ref={boxRef}
            className={className}
            contentEditable={editable}
            onInput={handleContentChange}
            onBlur={handleBlur}
            onClick={onClick}
            dangerouslySetInnerHTML={{ __html: children }}
        />
    );
};
