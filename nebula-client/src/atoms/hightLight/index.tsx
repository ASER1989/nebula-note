import React, { useMemo } from 'react';

export type Props = {
    keywords: string | Array<string> | undefined;
    children: string;
    focusId: string | undefined;
    id: string;
    ['data-test-id']?: string;
};
export default function HighLight({
    id,
    focusId,
    children,
    keywords,
    'data-test-id': dataTestId,
}: Props) {
    const isFocused = useMemo(() => id === focusId, [id, focusId]);

    if (keywords) {
        const keywordList = Array.isArray(keywords) ? keywords : [keywords];
        const result = keywordList.reduce((preValue: string, currentValue: string) => {
            return preValue.replace(
                currentValue,
                `<span style="background:yellow">${currentValue}</span>`,
            );
        }, children);
        const style = {
            textDecoration: isFocused ? 'underline' : 'none',
        };
        return (
            <span
                data-test-id={dataTestId}
                style={style}
                dangerouslySetInnerHTML={{ __html: result as any }}
            ></span>
        );
    }
    return <>{children}</>;
}
