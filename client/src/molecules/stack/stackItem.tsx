import React, {FC, ReactNode} from "react";

export type StackItemProps = {
  children: ReactNode;
  style?: React.CSSProperties;
  grow?: number;
  flex?: number
}

export const StackItem: FC<StackItemProps> = (
  {
    children,
    style,
    grow,
  }) => {
  return (
    <div style={{...style, flexGrow: grow}}>
      {children}
    </div>
  );
};
