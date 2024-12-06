import './index.styl';
import React from 'react';
import type { Folder } from './types';
import Input from '@client/atoms/input';
import Checkbox from '@client/atoms/checkbox';
import ExpandBox from '@client/atoms/expandbox';
import classNames from 'classnames';

type Props = {
    folder?: Folder;
    isChildTree?: boolean;
    checkedPath?: string | null;
    onChange?: (folder: Folder) => void;
    onCheck?: (folderPath: string, isChecked: boolean) => void;
};

type NodeProps = {
    folder: Folder;
    checkedPath?: string | null;
    onChange?: () => void;
    onCheck?: (folderPath: string, isChecked: boolean) => void;
};
export const FolderTreeNode = ({ folder, checkedPath, onChange, onCheck }: NodeProps) => {
    const handleCheck = (value: boolean) => {
        onCheck?.(folder.path, value);
        // onFieldChange?.(newField);
    };
    const handleExpanded = (value: boolean) => {
        folder.isExpanded = value;
        onChange?.();
    };

    return (
        <>
            <div
                className={classNames('tree_node', {
                    expanded: folder.isExpanded,
                    matchedMark: folder.isMatch,
                })}
            >
                <div className='tree_node_item'>
                    <Checkbox
                        value={checkedPath === folder.path}
                        onChange={handleCheck}
                        label={folder.name}
                    />
                </div>

                {folder.children.length > 0 && (
                    <div>
                        <ExpandBox value={folder.isExpanded} onChange={handleExpanded} />
                    </div>
                )}
            </div>
            {folder.isExpanded && (
                <div className='tree_node_indent'>
                    <FolderTree
                        folder={folder}
                        checkedPath={checkedPath}
                        isChildTree
                        onChange={onChange}
                        onCheck={onCheck}
                    />
                </div>
            )}
        </>
    );
};

export default function FolderTree({
    folder,
    isChildTree,
    checkedPath,
    onChange,
    onCheck,
}: Props) {
    if (!folder) {
        return null;
    }

    const handleChange = () => {
        onChange?.(folder);
    };

    const handleSearch = (key: string) => {
        const loopSearch = (destFolder: Folder, searchKey: string) => {
            const isMatch =
                ![null, undefined, ''].includes(searchKey) &&
                destFolder.name.toLowerCase().includes(searchKey);

            destFolder.isMatch = isMatch;

            if (destFolder.children.length > 0) {
                destFolder.children.forEach((item) => {
                    loopSearch(item, searchKey);
                });
                destFolder.isExpanded = destFolder.children.some(
                    (item) => item.isMatch || item.isExpanded,
                );
            }

            return destFolder;
        };
        loopSearch(folder, key.toLowerCase());
        onChange?.(folder);
    };

    return (
        <div className='folderTree'>
            {!isChildTree && (
                <div className='tool_bar'>
                    <div className='searchBox'>
                        <Input
                            placeholder='输入文件夹名称'
                            onChange={handleSearch}
                        ></Input>
                    </div>
                </div>
            )}

            <div className='treeRoot'>
                {folder?.children?.map((item, idx) => {
                    return (
                        <FolderTreeNode
                            key={idx}
                            folder={item}
                            checkedPath={checkedPath}
                            onChange={handleChange}
                            onCheck={onCheck}
                        />
                    );
                })}
            </div>
        </div>
    );
}
