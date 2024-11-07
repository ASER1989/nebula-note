import './index.styl';
import React from 'react';
import type { FocusEvent } from 'react';
import classNames from 'classnames';

type InputType = string | number | undefined;
export type Props<T> = {
    value?: T;
    border?: boolean;
    placeholder?: string;
    onChange?: (newValue: T, value?: T, event?: Event) => void;
    onFocus?: (e: FocusEvent<HTMLTextAreaElement, Element>) => void;
    rows?: number;
    resize?: 'default' | 'vertical' | 'horizontal' | 'none'
};

export default function Textarea<T extends InputType>(
    {
        value,
        border = true,
        onChange,
        placeholder,
        onFocus,
        rows = 6,
        resize
    }: Props<T>) {
    const handleChange = (e: any) => {
        onChange?.(e.target.value, value, e);
    };

    return (
        <textarea
            className={classNames('textarea',
                {
                    'border-none': !border,
                    [resize ?? '']: resize
                })}
            value={value}
            onChange={handleChange}
            onFocus={onFocus}
            placeholder={placeholder}
            rows={rows}
        />
    );
}
