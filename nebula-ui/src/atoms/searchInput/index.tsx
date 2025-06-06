import './index.styl';
import React, { type FocusEvent, forwardRef, useState } from 'react';
import IconButton from '@ui/atoms/iconButton';
import Input, { InputProps } from '@ui/atoms/input';
import { Stack, StackItem } from '@ui/molecules/stack';
import classNames from 'classnames';
import _ from 'lodash';
import { MdClose, MdManageSearch } from 'react-icons/md';

export type SearchInputProps = InputProps & {
    onClean?: () => void;
};
const SearchInputBase = (props: SearchInputProps, ref: React.Ref<HTMLInputElement>) => {
    const {
        size = 'medium',
        border,
        onFocus,
        onBlur,
        onClean,
        'data-test-id': dataTestId,
    } = props;
    const [isFocus, setIsFocus] = useState(false);
    const sizeMap: Record<string, number> = {
        tiny: 20,
        small: 25,
        medium: 30,
        large: 35,
    };
    const handleFocus = (e: FocusEvent<HTMLInputElement, Element>) => {
        setIsFocus(true);
        onFocus?.(e);
    };
    const handleBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
        setIsFocus(false);
        onBlur?.(e);
    };
    const handleClean = () => {
        onClean?.();
    };

    const classList = classNames('nebula-search-input', size, {
        'search-input--focus': isFocus,
        'search-input--border': border
    });
    return (
        <div className={classList} data-test-id={dataTestId}>
            <Stack align='center'>
                <StackItem>
                    <MdManageSearch size={sizeMap[size]} />
                </StackItem>
                <StackItem flex>
                    <Input
                        {..._.omit(props, ['size', 'onClean', 'data-test-id','border'])}
                        ref={ref}
                        type='text'
                        className='search-input'
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                    />
                </StackItem>
                <StackItem>
                    <IconButton onClick={handleClean}>
                        <MdClose size={sizeMap[size] - 5} />
                    </IconButton>
                </StackItem>
            </Stack>
        </div>
    );
};

SearchInputBase.displayName = 'SearchInput';
export const SearchInput = forwardRef(SearchInputBase);
export default SearchInput;
