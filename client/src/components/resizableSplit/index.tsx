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


  const handleDrag = (e: globalThis.MouseEvent) => {
    if (isHorizontal) {
      const newSize = (e.clientX / window.innerWidth) * 100;
      setSize(newSize);
    } else {
      const newSize = (e.clientY / window.innerHeight) * 100;
      setSize(newSize);
    }
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
