import './index.styl';
import React from 'react';
import classNames from 'classnames';

type Props = {
    onClick: () => void;
    children: React.ReactNode | string | Array<React.ReactNode | string>;
    type?: 'primary';
    disabeld?: boolean;
};

export default function Button({ onClick, children, type, disabeld }: Props) {
    const handleClick = () => {
        if (!disabeld) {
            onClick?.();
        }
    };

    return (
        <div
            className={classNames('button', {
                primary: type === 'primary',
                disabeld,
            })}
            onClick={handleClick}
        >
            {children}
        </div>
    );
}
