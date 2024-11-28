import React, { useState } from 'react';
import classNames from 'classnames';
import { FaPlayCircle } from 'react-icons/fa';
import { MdClose, MdCheck, MdDeleteForever } from 'react-icons/md';

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
    onRename: (name: string, newName: string) => Promise<boolean>;
};
export const ListItem = ({
    name,
    isChecked,
    onClick,
    onBuild,
    onRemove,
    onRename,
}: Props) => {
    const className = classNames({ checked: isChecked }, 'note-list-item');
    const [renameEnabled, setRenameEnabled] = useState(false);
    const [renameFocused, setRenameFocused] = useState(false);
    const [mutableName, setMutableName] = useState(name);
    const handleClick = () => {
        onClick?.();
    };

    const handleRenameFocus = () => {
        setRenameFocused(true);
    };
    const handleRenameEnabled = () => {
        setRenameEnabled(true);
    };

    const handleRename = async () => {
        const result = await onRename(name, mutableName);
        if (result) {
            setRenameEnabled(false);
            setRenameFocused(false);
        }
    };

    const handleRenameCancel = () => {
        setMutableName(name);
        setRenameEnabled(false);
        setRenameFocused(false);
    };

    const handleRenameBlur = (newName: string) => {
        setMutableName(newName);
        setRenameFocused(false);
    };
    const renameOperationsRender = () => {
        return (
            <Stack spacing={1}>
                <StackItem style={{ display: 'flex' }}>
                    <IconButton
                        onClick={handleRename}
                        type='circle'
                        hoverMode='highlight'
                        title='save'
                    >
                        <MdCheck color='green' size={20} />
                    </IconButton>
                </StackItem>
                <StackItem style={{ display: 'flex' }}>
                    <IconButton
                        onClick={handleRenameCancel}
                        type='circle'
                        hoverMode='highlight'
                        title='cancel'
                    >
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
                <Position
                    type='absolute'
                    right={1}
                    top={'50%'}
                    style={{ transform: 'translateY(-50%)' }}
                >
                    <IconButton onClick={onRemove} hoverMode='opacity' title='remove'>
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
                    <IconButton onClick={handleRenameFocus} title='rename'>
                        <LuPencilLine size={10} />
                    </IconButton>
                )}
            </div>
            <div className='item-name'>
                <EditableContent
                    editable={isChecked}
                    focus={renameFocused}
                    onFocus={handleRenameEnabled}
                    onBlur={handleRenameBlur}
                >
                    {mutableName}
                </EditableContent>
            </div>
            <div className='item-operation'>{operationsRender()}</div>
        </div>
    );
};
