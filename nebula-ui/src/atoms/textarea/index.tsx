import './index.styl';
import React from 'react';
import classNames from 'classnames';
import type { FocusEvent } from 'react';

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

export default function Textarea({
    value,
    border = true,
    onChange,
    placeholder,
    onFocus,
    rows = 6,
    resize,
    'data-test-id': dataTestId,
}: TextareaProps) {
    const handleChange = (e: any) => {
        onChange?.(e.target.value, value, e);
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
        />
    );
}
