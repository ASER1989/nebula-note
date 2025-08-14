import './index.styl';
import React, { ForwardedRef, forwardRef } from 'react';
import classNames from 'classnames';

export type ButtonProps = {
    onClick: () => void;
    children: React.ReactNode | string | Array<React.ReactNode | string>;
    type?: 'primary' | 'default';
    focus?: boolean;
    disabled?: boolean;
    ['data-test-id']?: string;
};

const ButtonBase = (
    { onClick, children, type, disabled, focus, 'data-test-id': dataTestId }: ButtonProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    const handleClick = () => {
        if (!disabled) {
            onClick?.();
        }
    };

    return (
        <div
            className={classNames('nebula-button', {
                primary: type === 'primary',
                disabled: disabled,
                focus,
            })}
            onClick={handleClick}
            data-test-id={dataTestId}
            ref={ref}
        >
            {children}
        </div>
    );
};

ButtonBase.displayName = 'Button';
export const Button = forwardRef(ButtonBase);
export default Button;
