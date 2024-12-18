import React from 'react';

export type SvgTextProps = {
    children?: string;
    height?: number | string;
    color?: string;
    fontSize: number;
    ['data-test-id']?: string;
};

const measureTextWidth = (
    text: string | null,
    fontSize: number,
    fontFamily = 'Arial',
) => {
    if (text === null) {
        return 0;
    }

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context) {
        context.font = `${fontSize}px ${fontFamily}`;

        // 计算文本的宽度
        const metrics = context.measureText(text);
        return metrics.width;
    }
    return 0;
};

export const SvgText = ({
    children,
    fontSize,
    height = '100%',
    color = 'black',
    'data-test-id': dataTestId,
}: SvgTextProps) => {
    const svgWidth = measureTextWidth(children ?? null, fontSize) + 10;
    return (
        <svg width={svgWidth} height={height} data-test-id={dataTestId}>
            <text
                x='0'
                y='50%'
                fontSize={fontSize}
                dominantBaseline='middle'
                textAnchor='start'
                fill={color}
            >
                {children}
            </text>
        </svg>
    );
};

export default SvgText;
