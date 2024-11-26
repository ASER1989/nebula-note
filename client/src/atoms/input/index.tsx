import './index.styl';
import React, { ChangeEvent, forwardRef } from 'react';
import type { FocusEvent } from 'react';
import classNames from 'classnames';

type InputType = string | undefined | number;
export type InputProps = {
    value?: InputType;
    border?: boolean;
    placeholder?: string;
    onChange?: <T extends string>(
        newValue: T,
        event?: ChangeEvent<HTMLInputElement>,
    ) => void;
    onFocus?: (e: FocusEvent<HTMLInputElement, Element>) => void;
    onBlur?: (e: FocusEvent<HTMLInputElement, Element>) => void;
    light?: boolean;
    size?: 'tiny' | 'small' | 'medium' | 'large';
    type?: HTMLInputElement['type'];
    className?: string;
    testId?: string;
};

const InputBase = (props: InputProps, ref: React.Ref<HTMLInputElement>) => {
    const {
        value,
        border = true,
        onChange,
        placeholder,
        onFocus,
        onBlur,
        light,
        size,
        type = 'text',
        className,
        testId,
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
            data-testid={testId}
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

export const Input = forwardRef(InputBase);
export default Input;
