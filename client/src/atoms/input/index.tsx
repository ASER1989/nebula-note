import './index.styl';
import React, {ChangeEvent} from 'react';
import type {FocusEvent} from 'react';
import classNames from 'classnames';

type InputType = string | number | undefined;
export type Props<T extends InputType> = {
  value?: T;
  border?: boolean;
  placeholder?: string;
  onChange?: (newValue: T, value?: T, event?: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement, Element>) => void;
  light?: boolean;
};


export default function Input<T extends InputType>(
  {
    value,
    border = true,
    onChange,
    placeholder,
    onFocus,
    light
  }: Props<T>) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    onChange?.(input.value as T, value, e);
  };

  const classes = classNames('input', {
    'border-none': !border,
    'height-light': light
  });

  return (
    <input
      className={classes}
      value={value}
      onChange={handleChange}
      onFocus={onFocus}
      placeholder={placeholder}
    />
  );
}
