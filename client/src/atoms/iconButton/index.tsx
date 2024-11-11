import './index.styl';
import React from 'react';
import classNames from 'classnames';

export type Props = {
    onClick?: () => void;
    children: React.ReactNode | string | Array<React.ReactNode | string>;
    disabled?: boolean;
};

export default function IconButton({ onClick, children, disabled }: Props) {
    const handleClick = () => {
        if (!disabled) {
            onClick?.();
        }
    };

    return (
        <div
            className={classNames('icon-button', {
                disabled: disabled,
            })}
            onClick={handleClick}
        >
            {children}
        </div>
    );
}
