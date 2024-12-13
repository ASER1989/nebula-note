import './index.styl';
import React, { forwardRef } from 'react';

export type Props = {
    padding?: number | string;
    margin?: number | string;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    ['data-test-id']?: string;
};

const SectionBase = (
    {
        padding = 20,
        margin,
        className,
        style,
        children,
        'data-test-id': dataTestId,
    }: Props,
    ref: React.Ref<HTMLDivElement>,
) => {
    return (
        <div
            className={`section ${className}`}
            style={{
                padding,
                margin,
                ...style,
            }}
            ref={ref}
            data-test-id={dataTestId}
        >
            {children}
        </div>
    );
};

SectionBase.displayName='Section';
export const Section = forwardRef(SectionBase);
export default Section;
