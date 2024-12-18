import './index.styl';
import React, { useMemo } from 'react';
import classNames from 'classnames';
import ScrollView from '@ui/molecules/scrollView';

export type CardProps = {
    title?: string;
    children: React.ReactElement;
    ['data-test-id']?: string;
};

export const CardBase = (
    { title, children, 'data-test-id': dataTestId }: CardProps,
    ref: React.ForwardedRef<HTMLDivElement>,
) => {
    // 检查 children 是否是一个 ScrollView 元素
    const isScrollView = useMemo(
        () => React.isValidElement(children) && children.type === ScrollView,
        [children],
    );

    const contentClassNames = classNames({ 'nebula-card-content': !isScrollView });
    const content = useMemo(() => {
        if (!isScrollView) {
            return children;
        }
        return React.cloneElement(children, { className: 'card-content' });
    }, [children]);

    return (
        <div className='molecules-card' data-test-id={dataTestId}>
            {title && <div className='card-title'>{title}</div>}
            <div className={contentClassNames}>{content}</div>
        </div>
    );
};

CardBase.displayName = 'Card';
export const Card = React.forwardRef(CardBase);
export default Card;
