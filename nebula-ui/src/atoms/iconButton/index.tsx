import './index.styl';
import React from 'react';
import classNames from 'classnames';

export type IconButtonProps = {
    onClick?: () => void;
    children: React.ReactNode | string | Array<React.ReactNode | string>;
    disabled?: boolean;
    type?: 'circle' | 'normal';
    hoverMode?: 'zoomOut' | 'highlight' | 'opacity';
    className?: string;
    title?: string;
    ['data-test-id']?: string;
};

export const IconButton = ({
    onClick,
    children,
    disabled,
    type,
    hoverMode,
    className,
    title,
    'data-test-id': dataTestId,
}: IconButtonProps) => {
    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!disabled) {
            onClick?.();
        }
    };

    return (
        <div
            title={title}
            className={classNames(className, 'nebula-icon-button', {
                disabled: disabled,
                circle: type === 'circle',
                highlight: hoverMode === 'highlight',
                zoomOut: hoverMode === 'zoomOut',
                opacity: hoverMode === 'opacity',
            })}
            onClick={handleClick}
            data-test-id={dataTestId}
        >
            {children}
        </div>
    );
};

export default IconButton;
