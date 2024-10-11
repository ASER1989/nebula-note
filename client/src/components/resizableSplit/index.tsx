import React, {MouseEvent, useState} from 'react';
import './index.styl';

export interface ResizableSplitProps {
  direction?: 'horizontal' | 'vertical';
  children?: [React.ReactNode, React.ReactNode];
}

const ResizableSplit: React.FC<ResizableSplitProps> = (
  {
    direction = 'horizontal',
    children
  }) => {

  const [size, setSize] = useState<number>(50); // 默认分割比率为50%

  const isHorizontal = direction === 'horizontal';

  const attrVal = `calc(${size}% - 10px) 10px auto`;
  const style = isHorizontal
    ? {gridTemplateColumns: attrVal} // 只设置水平方向的列布局
    : {gridTemplateRows: attrVal};  // 只设置垂直方向的行布局

  const limitQuery = (newSize: number) => {
    const result = newSize > 10 ? newSize : 10;
    return result > 90 ? 90 : result;
  }

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
      {once: true}
    );
  };

  return (
    <div className="resizable-split" style={style}>
      <div className="panel panel-1">{children?.[0]}</div>
      <div className="divider" onMouseDown={handleMouseDown}/>
      <div className="panel panel-2">{children?.[1]}</div>
    </div>
  );
};

export default ResizableSplit;
