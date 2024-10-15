import React from 'react';

export type Props = {
  children?: string;
  fontSize: number;
};

const measureTextWidth = (text: string | null, fontSize: number, fontFamily = 'Arial') => {

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
}

export default function SvgText({children, fontSize}: Props) {
  const svgWidth = measureTextWidth(children ?? null, fontSize) + 20;
  return (
    <svg width={svgWidth} height="100%">
      <text x="0" y="50%" fontSize={fontSize} dominantBaseline="middle" textAnchor="start">
        {children}
      </text>
    </svg>
  );
}
