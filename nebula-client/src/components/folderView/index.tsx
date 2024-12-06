import './index.styl';
import React, { useEffect, useRef } from 'react';
import { Item } from './item';

type Folder = { name: string; path: string };
export type Props = {
    data: Array<Folder>;
    value?: Folder;
    onClick?: (folder: Folder) => void;
    onDoubleClick?: (folder: Folder) => void;
};

export const FolderView = ({ data, value, onClick, onDoubleClick }: Props) => {
    const viewRef = useRef<HTMLDivElement>(null);
    const keyListRef = useRef<Array<string>>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            timerRef.current = setTimeout(() => {
                keyListRef.current = [];
            }, 1500);

            if (e.key.length === 1) {
                keyListRef.current.push(e.key);
            }

            if (keyListRef.current.length > 0) {
                const key = keyListRef.current.join('').toLowerCase();
                console.log('folderView search', key);
                const matchItem = data.find((item) =>
                    item.name.toLowerCase().startsWith(key),
                );
                if (matchItem) {
                    onClick?.(matchItem);
                }
            }
        };
        if (viewRef.current) {
            document.addEventListener('keydown', handleKeyDown);
            return () => {
                console.log('folderView removeEventListener keydown');
                document.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [viewRef, data]);

    return (
        <div className='folder-view' ref={viewRef}>
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
    );
};

export default FolderView;
