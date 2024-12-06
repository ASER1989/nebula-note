import './index.styl';
import React from 'react';
import classNames from 'classnames';

export type Props = {
    onClick: () => void;
    children: React.ReactNode | string | Array<React.ReactNode | string>;
    type?: 'primary' | 'default';
    disabled?: boolean;
};

export default function Button({ onClick, children, type, disabled }: Props) {
    const handleClick = () => {
        if (!disabled) {
            onClick?.();
        }
    };

    return (
        <div
            className={classNames('button', {
                primary: type === 'primary',
                disabled: disabled,
            })}
            onClick={handleClick}
        >
            {children}
        </div>
    );
}
