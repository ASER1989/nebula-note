import './index.styl';
import React, { ForwardedRef } from 'react';
import { GoChevronRight } from 'react-icons/go';

export type BreadcrumbItem = {
    label: string;
    path?: string;
};

export type BreadcrumbProps = {
    items: BreadcrumbItem[];
    onClick?: (item: BreadcrumbItem) => void;
    ['data-test-id']?: string;
};

export const BreadcrumbBase = (
    { items, onClick, 'data-test-id': dataTestId }: BreadcrumbProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <nav className='nebula-breadcrumb' data-test-id={dataTestId} ref={ref}>
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
                            <span className='breadcrumb-separator'>
                                <GoChevronRight size={16} />
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

BreadcrumbBase.displayName = 'Breadcrumb';
export const Breadcrumb = React.forwardRef(BreadcrumbBase);

export default Breadcrumb;
