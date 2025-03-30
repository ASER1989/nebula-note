import './index.styl';
import React from 'react';
import classNames from 'classnames';

export type SwitchButtonProps = {
    name?: string;
    value: boolean;
    onChange?: (value: boolean) => void;
    disabled?: boolean;
    className?: string;
    testId?: string;
    size?: 'tiny' | 'small' | 'medium' | 'large';
    ['data-test-id']?: string;
};

export const SwitchButton = ({
    name,
    value,
    onChange,
    disabled = false,
    className = '',
    size = 'medium',
    'data-test-id': dataTestId,
}: SwitchButtonProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(event.target.checked);
    };
    const switchClass = classNames('nebula-switch', size, className, {
        disabled: disabled,
    });
    return (
        <label className={switchClass} data-test-id={dataTestId}>
            <input
                name={name}
                type='checkbox'
                checked={value}
                onChange={handleChange}
                disabled={disabled}
            />
            <span className='slider'></span>
        </label>
    );
};

export default SwitchButton;
