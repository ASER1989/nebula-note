import './index.styl';
import React, { KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';

export type DropdownOption<T extends string = string> = {
    value: T;
    label: string;
    keyword?: string;
};
type TagItem = {
    tag: string;
    color: string;
};
export type Props<T extends string> = {
    options: Array<DropdownOption<T>>;
    onChange?: (option: DropdownOption<T>) => void;
    onFocus?: () => void;
    placeholder?: string;
    enableTags?: Array<TagItem>;
    size?: 'default' | 'tiny' | 'small';
    value?: string;
    themeColor?: string;
    onSearch?: (keyword: string | undefined) => void;
    disabled?: boolean;
    ['data-test-id']?: string;
};

export const Dropdown = <T extends string>({
    options,
    onFocus,
    onChange,
    placeholder = 'Select an option',
    enableTags,
    size,
    value,
    themeColor,
    disabled,
    onSearch,
    'data-test-id': dataTestId,
}: Props<T>) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchFocus, setIsSearchFocus] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [selectedItem, setSelectedItem] = useState<DropdownOption | null>(null);
    const [focusedIndex, setFocusedIndex] = useState(-1);

    const handleToggle = () => {
        setIsSearchFocus(true);
        setIsOpen(true);
        onFocus?.();
    };

    const handleSelect = (option: DropdownOption<T>) => {
        setSelectedItem(option);
        setIsOpen(false);
        onChange?.(option);
    };

    const handleReset = () => {
        setIsOpen(false);
        onSearch?.(undefined);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            handleReset();
        }
    };

    useEffect(() => {
        if (value) {
            const option = options?.find((item) => item.value === value);
            if (option) {
                setSelectedItem(option);
            }
        }
    }, [value, options]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const dropdownClass = classNames('dropdown', {
        placeholder: !selectedItem?.label,
        expand: isOpen,
        [size ?? '']: size,
    });

    const cssVariables = useMemo(() => {
        const variables: Record<string, unknown> = {};
        if (themeColor) {
            variables['--dropdown-line-color'] = themeColor;
        }
        return variables;
    }, [themeColor]);

    const searchEnable = useMemo(() => {
        return isSearchFocus && onSearch;
    }, [isSearchFocus, onSearch]);

    const renderTags = (label: string, tags?: Array<TagItem>) => {
        if (Array.isArray(tags) && tags.length > 0) {
            const htmlString = tags.reduce((prev, item) => {
                return prev.replace(
                    item.tag,
                    `<span style="color: ${item.color}">${item.tag}</span>`,
                );
            }, label);
            return <span dangerouslySetInnerHTML={{ __html: htmlString }}></span>;
        }
        return label;
    };

    const handleSearch = (value: string) => {
        onSearch?.(value);
    };

    const handleSearchBlur = () => {
        setTimeout(() => setIsSearchFocus(false), 100);
    };

    const handleSearchKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            handleReset();
            handleSearchBlur();
        }
        if (event.key === 'ArrowUp') {
            event.preventDefault();
            setFocusedIndex((prevIndex) =>
                prevIndex > 0 ? prevIndex - 1 : options.length - 1,
            );
        } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            setFocusedIndex((prevIndex) =>
                prevIndex < options.length - 1 ? prevIndex + 1 : 0,
            );
        } else if (event.key === 'Enter') {
            event.preventDefault();
            if (focusedIndex > -1) {
                handleSelect(options[focusedIndex]);
                handleReset();
                setIsSearchFocus(false);
                setFocusedIndex(-1);
            }
        }
    };

    return (
        <div
            className={dropdownClass}
            style={cssVariables}
            ref={dropdownRef}
            data-test-id={dataTestId}
        >
            {!searchEnable && (
                <button
                    className='dropdown-toggle'
                    onClick={handleToggle}
                    disabled={disabled}
                >
                    {selectedItem
                        ? renderTags(selectedItem.label, enableTags)
                        : placeholder}
                </button>
            )}

            {searchEnable && (
                <input
                    onChange={(event) => handleSearch(event.target.value)}
                    onBlur={handleSearchBlur}
                    autoFocus={isSearchFocus}
                    onKeyDown={(event) => handleSearchKeyDown(event)}
                    disabled={disabled}
                />
            )}

            {isOpen && (
                <ul className='dropdown-menu'>
                    {options.map((option, index) => (
                        <li
                            className={classNames({ hover: index === focusedIndex })}
                            key={index}
                            onClick={() => handleSelect(option)}
                        >
                            {renderTags(option.label, enableTags)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

Dropdown.displayName = 'Dropdown';

export default Dropdown;
