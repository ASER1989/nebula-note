import '../../index.styl';
import React, { useState } from 'react';
import { EditableContent } from '@client/atoms/editableContent';
import IconButton from '@client/atoms/iconButton';
import Position from '@client/molecules/position';
import { Stack, StackItem } from '@client/molecules/stack';
import classNames from 'classnames';
import { FaPlayCircle } from 'react-icons/fa';
import { LuPencilLine } from 'react-icons/lu';
import { MdCheck, MdClose, MdDeleteForever } from 'react-icons/md';

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
        if (newName === name) {
            setRenameEnabled(false);
        }
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
                        data-test-id='rename-submit-button'
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
                        data-test-id='rename-cancel-button'
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
                {onBuild && (
                    <IconButton onClick={onBuild} data-test-id='note-item-build'>
                        <FaPlayCircle color='#009688' size={20} />
                    </IconButton>
                )}
                <Position
                    type='absolute'
                    right={1}
                    top={'50%'}
                    style={{ transform: 'translateY(-50%)' }}
                >
                    <IconButton
                        onClick={onRemove}
                        hoverMode='opacity'
                        title='remove'
                        data-test-id='note-item-remove'
                    >
                        <MdDeleteForever color='red' size={23} />
                    </IconButton>
                </Position>
            </>
        );
    };
    return (
        <div onClick={handleClick} className={className} data-test-id='note-list-item'>
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
                    data-test-id='note-list-name'
                >
                    {mutableName}
                </EditableContent>
            </div>
            <div className='item-operation'>{operationsRender()}</div>
        </div>
    );
};
