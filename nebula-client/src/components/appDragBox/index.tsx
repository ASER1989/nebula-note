import React, { useRef, useEffect } from 'react';
import {Position} from "@nebula-note/ui";

const AppDragBox = () => {
  const dragBoxRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = React.useState('hidden');
  useEffect(() => {
    const dragBox = dragBoxRef.current;

    if (dragBox) {
      const onMouseDown = (e: MouseEvent) => {
        setIsDragging('visible');
        console.log('-----visible')
      };

      const onMouseUp = () => {
        setIsDragging('hidden');
        console.log('-----hidden')
      };

      // 绑定事件
      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);

      return () => {
        // 清理事件监听器
        document.removeEventListener('mousedown', onMouseDown);
        document.removeEventListener('mouseup', onMouseUp);
      };
    }
  }, []);

  return (
    <Position
      ref={dragBoxRef}
      type={'fixed'}
      top={0}
      left={0}
      right={0}
      style={{ height: 35, '-webkit-app-region': 'drag', visibility: isDragging } as React.CSSProperties}
    />
  );
};

export default AppDragBox;
