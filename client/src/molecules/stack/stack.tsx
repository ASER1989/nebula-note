import React, { forwardRef, ReactElement, useMemo } from 'react';

import { StackItem } from '@client/molecules/stack/stackItem';

export type StackProps = {
    direction?: 'vertical' | 'horizontal';
    spacing?: number;
    align?: 'stretch' | 'center' | 'flex-start' | 'flex-end';
    justify?: 'flex-start' | 'center' | 'space-between' | 'space-around' | 'flex-end';
    overflow?: 'auto' | 'hidden';
    children: ReactElement<typeof StackItem> | ReactElement<typeof StackItem>[];
};

export const Stack = forwardRef<HTMLDivElement, StackProps>((props, ref) => {
    const {
        direction = 'horizontal',
        spacing = 0,
        align = 'stretch',
        justify = 'flex-start',
        overflow = 'hidden',
        children,
    } = props;
    const style: React.CSSProperties = useMemo(
        () => ({
            overflow,
            display: 'flex',
            flexDirection: direction === 'horizontal' ? 'row' : 'column',
            gap: `${spacing}px`,
            alignItems: align,
            justifyContent: justify,
            [direction === 'horizontal' ? 'width' : 'height']: '100%',
        }),
        [direction, spacing, align, justify],
    );

    return (
        <div className='stack' style={style} ref={ref}>
            {children}
        </div>
    );
});

Stack.displayName = 'Stack';
