import React, {FC, ReactElement, useMemo} from 'react';
import {StackItem} from "@client/molecules/stack/stackItem";

export type StackProps =
  {
    direction?: 'row' | 'column';
    spacing?: number;
    align?: 'stretch' | 'center' | 'flex-start' | 'flex-end';
    justify?: 'flex-start' | 'center' | 'space-between' | 'space-around' | 'flex-end';
    children: ReactElement<typeof StackItem> | ReactElement<typeof StackItem>[];
  }

export const Stack: FC<StackProps> = (
  {
    direction = 'row',
    spacing = 0,
    align = 'stretch',
    justify = 'flex-start',
    children
  }) => {

  const style = useMemo(() => ({
    display: 'flex',
    flexDirection: direction,
    gap: `${spacing}px`,
    alignItems: align,
    justifyContent: justify,
    [direction === 'row' ? 'width' : 'height']: '100%'
  }), [direction, spacing, align, justify]);

  return (
    <div className="stack" style={style}>
      {children}
    </div>
  );
};
