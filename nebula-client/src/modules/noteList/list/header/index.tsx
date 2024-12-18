import React, { useEffect, useRef, useState } from 'react';
import { useNoteConfig } from '@client/models/noteModel';
import useNote from '@client/modules/noteList/useNote';
import { IconButton } from '@nebula-note/ui';
import { SearchInput } from '@nebula-note/ui';
import { Stack, StackItem } from '@nebula-note/ui';
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
                    data-test-id='note-list-search-input'
                />
            </div>
        );
    }
    return (
        <div className='note-list-header'>
            <Stack justify='flex-end' align='center' spacing={10}>
                <StackItem>
                    <IconButton
                        onClick={handleCreateNote}
                        data-test-id='note-list-create-note-button'
                    >
                        <FiEdit size={20} color={'#FFFFFF'} />
                    </IconButton>
                </StackItem>
                <StackItem>
                    <IconButton
                        onClick={() => setSearchBoxShown(true)}
                        data-test-id='note-list-search-button'
                    >
                        <MdManageSearch color={'#FFFFFF'} size={27} />
                    </IconButton>
                </StackItem>
            </Stack>
        </div>
    );
};
