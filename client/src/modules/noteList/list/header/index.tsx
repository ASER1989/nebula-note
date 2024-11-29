import React, { useState, useRef, useEffect } from 'react';
import { Stack, StackItem } from '@client/molecules/stack';
import { FiEdit } from 'react-icons/fi';
import IconButton from '@client/atoms/iconButton';
import { MdManageSearch } from 'react-icons/md';
import SearchInput from '@client/atoms/searchInput';
import {useNoteConfig} from "@client/models/noteModel";
import {actions} from "@client/modules/noteList/storeSlice";
import {useDispatch} from "react-redux";

export const Header = () => {
    const dispatch = useDispatch();
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

    const handleCreateNote= () => {
        dispatch(actions.setCreateFormShown(true));
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
