import React, { useMemo } from 'react';

export type Props = {
    type?: 'vertical' | 'horizontal';
    color?: string;
    margin?: number;
    height?: string | number;
    width?: string | number;
    ['data-test-id']?: string;
};

export const Divider = (props: Props) => {
    const {
        type,
        color = '#777777',
        margin = 0,
        height = '100%',
        width = '100',
        'data-test-id': dataTestId,
    } = props;
    const style = useMemo(() => {
        const isVertical = type === 'vertical';
        return {
            width: isVertical ? '1px' : width,
            height: !isVertical ? '1px' : height,
            backgroundColor: color,
            margin: isVertical ? `0 ${margin}px` : `${margin}px 0`,
        };
    }, [type]);

    return <div style={style} data-test-id={dataTestId}></div>;
};

export default Divider;
