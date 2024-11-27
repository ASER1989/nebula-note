import React from 'react';
import classNames from 'classnames';
import { FaPlayCircle } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

import '../../index.styl';
import IconButton from '@client/atoms/iconButton';
import Position from '@client/molecules/position';

export type Props = {
    name: string;
    isChecked: boolean;
    onClick?: () => void;
    onBuild?: () => void;
};
export const ListItem = ({ name, isChecked, onClick, onBuild }: Props) => {
    const className = classNames({ checked: isChecked }, 'snippet-list-item');
    const handleClick = () => {
        onClick?.();
    };

    return (
        <div onClick={handleClick} className={className}>
            <div className='item-name'> {name}</div>
            <div className='item-operation'>
                {isChecked && (
                    <>
                        <IconButton onClick={onBuild}>
                            <FaPlayCircle color='#009688' size={23} />
                        </IconButton>
                        <Position type='absolute' right={1} top={1}>
                            <IconButton>
                                <MdClose color='#606060' size={15} />
                            </IconButton>
                        </Position>
                    </>
                )}
            </div>
        </div>
    );
};
