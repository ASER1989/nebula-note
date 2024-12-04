import React from 'react';
import { FcFolder } from 'react-icons/fc';
import classNames from 'classnames';

export type Props = {
    title: string;
    active?: boolean;
    onClick?: () => void;
    onDoubleClick?: () => void;
};
export const Item = ({ title, active ,onClick,onDoubleClick}: Props) => {
    const itemClass = classNames('folder-item', { active: active });

    return (
        <div className={itemClass} onClick={onClick} onDoubleClick={onDoubleClick}>
            <div className='item-icon'>
                <FcFolder size={60} />
            </div>
            <div className='item-title'>{title}</div>
        </div>
    );
};

export default Item;
