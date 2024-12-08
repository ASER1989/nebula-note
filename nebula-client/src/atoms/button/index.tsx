import './index.styl';
import React from 'react';
import classNames from 'classnames';

export type Props = {
    onClick: () => void;
    children: React.ReactNode | string | Array<React.ReactNode | string>;
    type?: 'primary' | 'default';
    disabled?: boolean;
    ['data-test-id']?: string;
};

export default function Button({
    onClick,
    children,
    type,
    disabled,
    'data-test-id': dataTestId,
}: Props) {
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
            data-test-id={dataTestId}
        >
            {children}
        </div>
    );
}
