import React, { useMemo } from 'react';
import './index.styl';
import ScrollView from '@client/molecules/scrollView';
import classNames from 'classnames';

export type Props = {
    title?: string;
    children: React.ReactElement;
};

export const Card = ({ title, children }: Props) => {
    // 检查 children 是否是一个 ScrollView 元素
    const isScrollView = useMemo(
        () => React.isValidElement(children) && children.type === ScrollView,
        [children],
    );

    const contentClassNames = classNames({ 'card-content': !isScrollView });
    const content = useMemo(() => {
        if (!isScrollView) {
            return children;
        }
        return React.cloneElement(children, { className: 'card-content' });
    }, [children]);

    return (
        <div className='molecules-card'>
            {title && <div className='card-title'>{title}</div>}
            <div className={contentClassNames}>{content}</div>
        </div>
    );
};

export default Card;
