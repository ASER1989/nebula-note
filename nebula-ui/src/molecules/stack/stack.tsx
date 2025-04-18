import React, { ReactElement, forwardRef, useMemo } from 'react';
import { StackItem } from '@ui/molecules/stack/stackItem';

export type StackProps = {
    type?: 'flex' | 'inline-flex';
    direction?: 'vertical' | 'horizontal';
    spacing?: number;
    align?: React.CSSProperties['alignItems'];
    justify?: 'flex-start' | 'center' | 'space-between' | 'space-around' | 'flex-end';
    overflow?: React.CSSProperties['overflow'];
    children: ReactElement<typeof StackItem> | ReactElement<typeof StackItem>[];
};

export const Stack = forwardRef<HTMLDivElement, StackProps>((props, ref) => {
    const {
        type = 'flex',
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
            display: type,
            flexDirection: direction === 'horizontal' ? 'row' : 'column',
            gap: `${spacing}px`,
            alignItems: align,
            justifyContent: justify,
            [direction === 'horizontal' ? 'width' : 'height']: '100%',
        }),
        [type, direction, spacing, align, justify, overflow],
    );

    return (
        <div style={style} ref={ref}>
            {children}
        </div>
    );
});

Stack.displayName = 'Stack';
