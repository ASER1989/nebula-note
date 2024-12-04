import React from 'react';
import './index.styl';
import { Item } from './item';

type Folder = { name: string; path: string };
export type Props = {
    data: Array<Folder>;
    value?: Folder;
    onClick?: (folder: Folder) => void;
    onDoubleClick?: (folder: Folder) => void;
};

export const FolderView = ({ data, value, onClick, onDoubleClick }: Props) => {
    return (
        <div className='folder-view'>
            <div className='folder-view-container'>
                {data.map((item, index) => {
                    return (
                        <Item
                            key={index}
                            title={`${item.name}`}
                            active={value?.name === `${item.name}`}
                            onClick={() => onClick?.(item)}
                            onDoubleClick={() => onDoubleClick?.(item)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default FolderView;
