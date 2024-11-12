import React, { MouseEvent, useState, useMemo } from 'react';
import _ from 'lodash';
import './index.styl';

export interface SplitPanelProps {
    direction?: 'horizontal' | 'vertical';
    children?: [React.ReactNode, React.ReactNode];
    dividerWidth?: number;
    percentage?: number;
    minWidth?: number;
}

const SplitPanel: React.FC<SplitPanelProps> = ({
    direction = 'horizontal',
    children,
    percentage = 50,
    dividerWidth = 5,
    minWidth,
}) => {
    const [size, setSize] = useState<number>(percentage); // 默认分割比率为50%

    const isHorizontal = direction === 'horizontal';

    const style = useMemo(() => {
        let realSize = `${size}%`;

        if (minWidth !== undefined && minWidth !== null) {
            const windowSize = isHorizontal ? window.innerWidth : window.innerHeight;
            const firstPanelSize = (windowSize * size) / 100;
            realSize = `${firstPanelSize < minWidth ? minWidth : firstPanelSize}px`;
        }

        const attrVal = `calc(${realSize} - ${dividerWidth}px) ${dividerWidth}px auto`;
        const result = {
            '--divider-width': `${dividerWidth}px`,
        };
        const gridStyle = isHorizontal
            ? { gridTemplateColumns: attrVal } // 只设置水平方向的列布局
            : { gridTemplateRows: attrVal }; // 只设置垂直方向的行布局

        return _.defaults(gridStyle, result);
    }, [size, minWidth]);

    const limitQuery = (newSize: number) => {
        const result = newSize > 10 ? newSize : 10;
        return result > 90 ? 90 : result;
    };

    const handleDrag = (e: globalThis.MouseEvent) => {
        let ratio = 0;
        if (isHorizontal) {
            ratio = e.clientX / window.innerWidth;
        } else {
            ratio = e.clientY / window.innerHeight;
        }
        const newSize = ratio * 100;
        setSize(limitQuery(newSize));
    };

    const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault(); // 防止默认行为
        document.body.style.cursor = isHorizontal ? 'col-resize' : 'row-resize'; // 设置鼠标样式
        document.addEventListener('mousemove', handleDrag);
        document.addEventListener(
            'mouseup',
            () => {
                document.removeEventListener('mousemove', handleDrag);
                document.body.style.cursor = 'default';
            },
            { once: true },
        );
    };

    return (
        <div className='split-panel' style={style}>
            <div className='panel panel-1'>{children?.[0]}</div>
            <div className='divider' onMouseDown={handleMouseDown} />
            <div className='panel panel-2'>{children?.[1]}</div>
        </div>
    );
};

export default SplitPanel;
