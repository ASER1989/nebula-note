import './index.styl';
import React, { forwardRef } from 'react';

export type Props = {
    padding?: number | string;
    margin?: number | string;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
};

const SectionBase = (
    { padding = 20, margin, className, style, children }: Props,
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
        >
            {children}
        </div>
    );
};

export const Section = forwardRef(SectionBase);
export default Section;
