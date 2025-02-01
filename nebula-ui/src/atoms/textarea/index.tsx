import './index.styl';
import React, { ChangeEvent, useRef } from 'react';
import type { FocusEvent } from 'react';
import classNames from 'classnames';

export type TextareaProps = {
    value?: string;
    border?: boolean;
    placeholder?: string;
    onChange?: (newValue: string, value?: string, event?: Event) => void;
    onFocus?: (e: FocusEvent<HTMLTextAreaElement, Element>) => void;
    rows?: number;
    resize?: 'default' | 'vertical' | 'horizontal' | 'none';
    ['data-test-id']?: string;
};

export const Textarea = ({
    value,
    border = true,
    onChange,
    placeholder,
    onFocus,
    rows = 6,
    resize,
    'data-test-id': dataTestId,
}: TextareaProps) => {
    const isComposition = useRef(false);
    const handleCompositionStart = () => {
        isComposition.current = true;
    };

    const handleCompositionEnd = (e: React.CompositionEvent<HTMLTextAreaElement>) => {
        isComposition.current = false;
        handleChange(e as unknown as ChangeEvent<HTMLInputElement>);
    };
    const handleChange = (e: any) => {
        if (!isComposition.current) {
            onChange?.(e.target.value, value, e);
        }
    };

    return (
        <textarea
            className={classNames('nebula-textarea', {
                'border-none': !border,
                [resize ?? '']: resize,
            })}
            value={value}
            onChange={handleChange}
            onFocus={onFocus}
            placeholder={placeholder}
            rows={rows}
            data-test-id={dataTestId}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
        />
    );
};

export default Textarea;
