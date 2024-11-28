import React, { useState } from 'react';
import classNames from 'classnames';
import { FaPlayCircle } from 'react-icons/fa';
import { MdClose, MdCheck,MdDeleteForever } from 'react-icons/md';

import '../../index.styl';
import IconButton from '@client/atoms/iconButton';
import Position from '@client/molecules/position';
import { LuPencilLine } from 'react-icons/lu';
import { EditableContent } from '@client/atoms/editableContent';
import { Stack, StackItem } from '@client/molecules/stack';

export type Props = {
    name: string;
    isChecked: boolean;
    onClick?: () => void;
    onBuild?: () => void;
    onRemove?: () => void;
};
export const ListItem = ({ name, isChecked, onClick, onBuild, onRemove }: Props) => {
    const className = classNames({ checked: isChecked }, 'note-list-item');
    const [renameEnabled, setRenameEnabled] = useState(false);
    const [renameFocused, setRenameFocused] = useState(false);
    const handleClick = () => {
        onClick?.();
    };

    const handleRenameFocus = () => {
        setRenameFocused(true);
    };
    const handleRenameEnabled = () => {
        setRenameEnabled(true);
    };

    const renameOperationsRender = () => {
        return (
            <Stack spacing={1}>
                <StackItem>
                    <IconButton onClick={onRemove} type='circle' hoverMode='highlight'>
                        <MdCheck color='green' size={20} />
                    </IconButton>
                </StackItem>
                <StackItem>
                    <IconButton onClick={onRemove} type='circle' hoverMode='highlight'>
                        <MdClose color='#606060' size={20} />
                    </IconButton>
                </StackItem>
            </Stack>
        );
    };

    const operationsRender = () => {
        if (!isChecked) {
            return null;
        }
        if (isChecked && renameEnabled) {
            return renameOperationsRender();
        }

        return (
            <>
                <IconButton onClick={onBuild}>
                    <FaPlayCircle color='#009688' size={20} />
                </IconButton>
                <Position type='absolute' right={1} top={'50%'} style={{transform: 'translateY(-50%)'}}>
                    <IconButton onClick={onRemove} hoverMode={'opacity'}>
                        <MdDeleteForever color='red' size={23} />
                    </IconButton>
                </Position>
            </>
        );
    };
    return (
        <div onClick={handleClick} className={className}>
            <div className='item-tag'>
                {isChecked && (
                    <IconButton onClick={handleRenameFocus}>
                        <LuPencilLine size={10} />
                    </IconButton>
                )}
            </div>
            <div className='item-name'>
                <EditableContent
                    editable={isChecked}
                    focus={renameFocused}
                    onFocus={handleRenameEnabled}
                    onBlur={() => setRenameFocused(false)}
                >
                    {name}
                </EditableContent>
            </div>
            <div className='item-operation'>{operationsRender()}</div>
        </div>
    );
};
