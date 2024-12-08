import './index.styl';
import React, { type FocusEvent, forwardRef, useState } from 'react';
import IconButton from '@client/atoms/iconButton';
import Input, { InputProps } from '@client/atoms/input';
import { Stack, StackItem } from '@client/molecules/stack';
import classNames from 'classnames';
import _ from 'lodash';
import { MdClose, MdManageSearch } from 'react-icons/md';

export type Props = InputProps & {
    onClean?: () => void;
};
const SearchInputBase = (props: Props, ref: React.Ref<HTMLInputElement>) => {
    const {
        size = 'medium',
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

    const classList = classNames('search-input', size, {
        'search-input--focus': isFocus,
    });
    return (
        <div className={classList} data-test-id={dataTestId}>
            <Stack align='center'>
                <StackItem>
                    <MdManageSearch size={sizeMap[size]} />
                </StackItem>
                <StackItem flex>
                    <Input
                        {..._.omit(props, ['size', 'onClean', 'data-test-id'])}
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
export const SearchInput = forwardRef(SearchInputBase);
export default SearchInput;
