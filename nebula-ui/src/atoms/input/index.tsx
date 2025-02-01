import './index.styl';
import React, { ChangeEvent, forwardRef, useRef } from 'react';
import type { FocusEvent } from 'react';
import classNames from 'classnames';

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

    const isComposition = useRef(false);
    const handleCompositionStart = () => {
        isComposition.current = true;
    };

    const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
        isComposition.current = false;
        handleChange(e as unknown as ChangeEvent<HTMLInputElement>);
    };
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(!isComposition.current) {
            const input = e.target as HTMLInputElement;
            onChange?.(input.value, e);
        }
    };

    const classes = classNames(className, 'nebula-input', size, {
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
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
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
