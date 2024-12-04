import React from 'react';
import './index.styl';

export type BreadcrumbItem = {
    label: string;
    path?: string;
};

export type Props = {
    items: BreadcrumbItem[];
    onClick?: (item: BreadcrumbItem) => void;
};

export const Breadcrumb: React.FC<Props> = ({ items, onClick }) => {
    return (
        <nav className='breadcrumb'>
            <ol className='breadcrumb-list'>
                {items.map((item, index) => (
                    <li key={index} className='breadcrumb-item'>
                        <span
                            className='breadcrumb-label'
                            onClick={() => onClick?.(item)}
                        >
                            {item.label}
                        </span>
                        {index < items.length - 1 && (
                            <span className='breadcrumb-separator'>/</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
