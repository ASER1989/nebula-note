import './index.styl';
import React from 'react';
import classNames from 'classnames';

export type Props = {
    value: boolean;
    onChange?: (value: boolean) => void;
    disabled?: boolean;
    className?: string;
    testId?: string;
    size?: 'tiny' | 'small' | 'medium' | 'large';
};

export const Switch = ({
    value,
    onChange,
    disabled = false,
    className = '',
    testId = '',
    size = 'medium',
}: Props) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(event.target.checked);
    };
    const switchClass = classNames('switch', size, className, {
        disabled: disabled,
    });
    return (
        <label className={switchClass} data-testid={testId}>
            <input
                type='checkbox'
                checked={value}
                onChange={handleChange}
                disabled={disabled}
            />
            <span className='slider'></span>
        </label>
    );
};

export default Switch;
