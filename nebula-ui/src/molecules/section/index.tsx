import './index.styl';
import React, { forwardRef } from 'react';

export type SectionProps = {
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
    }: SectionProps,
    ref: React.Ref<HTMLDivElement>,
) => {
    return (
        <div
            className={`nebula-section ${className}`}
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
