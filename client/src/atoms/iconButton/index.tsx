import './index.styl';
import React from 'react';
import classNames from 'classnames';

export type Props = {
    onClick?: () => void;
    children: React.ReactNode | string | Array<React.ReactNode | string>;
    disabled?: boolean;
    type?: 'circle' | 'normal';
    hoverMode?: 'zoomOut' | 'highlight' | 'opacity';
    className?: string;
    title?: string;
};

export default function IconButton({
    onClick,
    children,
    disabled,
    type,
    hoverMode,
    className,
    title,
}: Props) {
    const handleClick = () => {
        if (!disabled) {
            onClick?.();
        }
    };

    return (
        <div
            title={title}
            className={classNames(className, 'icon-button', {
                disabled: disabled,
                circle: type === 'circle',
                highlight: hoverMode === 'highlight',
                zoomOut: hoverMode === 'zoomOut',
                opacity: hoverMode === 'opacity',
            })}
            onClick={handleClick}
        >
            {children}
        </div>
    );
}
