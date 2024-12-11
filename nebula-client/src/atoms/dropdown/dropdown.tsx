import './index.styl';
import React, {
    KeyboardEvent,
    ReactElement,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import classNames from 'classnames';
import { Option } from './option';

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
    onChange?: (option: DropdownOption<T>) => void;
    onFocus?: () => void;
    placeholder?: string;
    enableTags?: Array<TagItem>;
    size?: 'default' | 'tiny' | 'small';
    value?: T;
    themeColor?: string;
    onSearch?: (keyword: string | undefined) => void;
    disabled?: boolean;
    ['data-test-id']?: string;
};

export type DropdownProps<T extends string> = Props<T> &
    (
        | {
              options: Array<DropdownOption<T>>;
          }
        | {
              children: React.ReactNode;
          }
    );

export const Dropdown = <T extends string>(props: DropdownProps<T>) => {
    const {
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
    } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchFocus, setIsSearchFocus] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [selectedItem, setSelectedItem] = useState<DropdownOption | null>(null);
    const [focusedIndex, setFocusedIndex] = useState(-1);

    const optionsMemo = useMemo(() => {
        if ('options' in props) {
            return props.options as Array<DropdownOption<T>>;
        } else if ('children' in props) {
            const res = React.Children.map(props.children, (child) => {
                if (React.isValidElement(child) && child.type === Option) {
                    return {
                        ...child.props,
                        label: child.props.children,
                    } as DropdownOption<T>;
                }
            });
            return res?.filter((item) => item !== undefined) ?? [];
        }
        return [] as Array<DropdownOption<T>>;
    }, [props]);

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
            const option = optionsMemo?.find((item) => item?.value === value);
            if (option) {
                setSelectedItem(option);
            }
        }
    }, [value, optionsMemo]);

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
                prevIndex > 0 ? prevIndex - 1 : optionsMemo.length - 1,
            );
        } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            setFocusedIndex((prevIndex) =>
                prevIndex < optionsMemo.length - 1 ? prevIndex + 1 : 0,
            );
        } else if (event.key === 'Enter') {
            event.preventDefault();
            if (focusedIndex > -1) {
                handleSelect(optionsMemo[focusedIndex]);
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
                    {optionsMemo.map((option, index) => (
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
