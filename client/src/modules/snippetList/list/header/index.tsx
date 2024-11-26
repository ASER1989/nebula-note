import React, { useState, useContext, useRef, useEffect } from 'react';
import { Stack, StackItem } from '@client/molecules/stack';
import { FiEdit } from 'react-icons/fi';
import IconButton from '@client/atoms/iconButton';
import { MdManageSearch } from 'react-icons/md';
import SearchInput from '@client/atoms/searchInput';
import { SnippetListContext } from '../../context';

export const Header = () => {
    const [searchBoxShown, setSearchBoxShown] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const { keyword, setKeyword, createSnippet } = useContext(SnippetListContext);

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

    if (searchBoxShown) {
        return (
            <div className='snippet-list-header'>
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
        <div className='snippet-list-header'>
            <Stack justify='flex-end' align='center' spacing={10}>
                <StackItem>
                    <IconButton onClick={createSnippet}>
                        <FiEdit size={20} color={'#FFFFFF'} />
                    </IconButton>
                </StackItem>
                <StackItem>
                    <IconButton onClick={() => setSearchBoxShown(true)}>
                        <MdManageSearch color={'#FFFFFF'} size={25} />
                    </IconButton>
                </StackItem>
            </Stack>
        </div>
    );
};
