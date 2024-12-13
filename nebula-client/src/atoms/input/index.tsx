import './index.styl';
import React, { ChangeEvent, forwardRef } from 'react';
import classNames from 'classnames';
import type { FocusEvent } from 'react';

export type InputProps = {
    value?: string;
    name?: string;
    border?: boolean;
    placeholder?: string;
    onChange?: (newValue: string, event?: ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (e: FocusEvent<HTMLInputElement, Element>) => void;
    onBlur?: (e: FocusEvent<HTMLInputElement, Element>) => void;
    light?: boolean;
    size?: 'tiny' | 'small' | 'medium' | 'large';
    type?: HTMLInputElement['type'];
    className?: string;
    ['data-test-id']?: string;
};

const InputBase = (props: InputProps, ref: React.Ref<HTMLInputElement>) => {
    const {
        value,
        name,
        border = true,
        onChange,
        placeholder,
        onFocus,
        onBlur,
        light,
        size,
        type = 'text',
        className,
        'data-test-id': dataTestId,
    } = props;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement;
        onChange?.(input.value, e);
    };

    const classes = classNames(className, 'input', size, {
        'border-none': !border,
        'height-light': light,
    });

    return (
        <input
            ref={ref}
            name={name}
            data-test-id={dataTestId}
            className={classes}
            value={value}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder={placeholder}
            type={type}
        />
    );
};

InputBase.displayName = 'Input';
export const Input = forwardRef(InputBase);
export default Input;
