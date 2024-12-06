import React, { useEffect, useRef, useState } from 'react';
import IconButton from '@client/atoms/iconButton';
import SearchInput from '@client/atoms/searchInput';
import { useNoteConfig } from '@client/models/noteModel';
import useNote from '@client/modules/noteList/useNote';
import { Stack, StackItem } from '@client/molecules/stack';
import { FiEdit } from 'react-icons/fi';
import { MdManageSearch } from 'react-icons/md';

export const Header = () => {
    const actions = useNote();
    const [searchBoxShown, setSearchBoxShown] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const { keyword, setKeyword } = useNoteConfig();

    useEffect(() => {
        if (searchInputRef.current && searchBoxShown) {
            searchInputRef.current.focus();
        }
    }, [searchBoxShown]);
    const handleClean = () => {
        if (keyword === undefined || keyword === '') {
            setSearchBoxShown(false);
        }
        setKeyword('');
    };
    const handleChange = (newValue?: string | number) => {
        setKeyword(newValue as string);
    };

    const handleCreateNote = () => {
        actions.setCreateFormShown(true);
    };

    if (searchBoxShown) {
        return (
            <div className='note-list-header'>
                <SearchInput
                    ref={searchInputRef}
                    size='small'
                    onClean={handleClean}
                    value={keyword}
                    onChange={handleChange}
                />
            </div>
        );
    }
    return (
        <div className='note-list-header'>
            <Stack justify='flex-end' align='center' spacing={10}>
                <StackItem>
                    <IconButton onClick={handleCreateNote}>
                        <FiEdit size={20} color={'#FFFFFF'} />
                    </IconButton>
                </StackItem>
                <StackItem>
                    <IconButton onClick={() => setSearchBoxShown(true)}>
                        <MdManageSearch color={'#FFFFFF'} size={27} />
                    </IconButton>
                </StackItem>
            </Stack>
        </div>
    );
};
