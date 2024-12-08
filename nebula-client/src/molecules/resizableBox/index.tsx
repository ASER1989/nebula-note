import React, { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import _ from 'lodash';

export type ResizableBoxProps = {
    anchor: React.RefObject<HTMLDivElement>;
    children: ReactElement;
    initialWidth?: number | string;
    initialHeight?: number | string;
    minWidth?: number;
    minHeight?: number;
    left?: boolean;
    right?: boolean;
    top?: boolean;
    bottom?: boolean;
}

type CursorType = 'ew-resize' | 'ns-resize' | 'default';
const ResizableBox: React.FC<ResizableBoxProps> = (props) => {
    const {
        anchor,
        children,
        initialWidth,
        minWidth = 0,
        initialHeight,
        minHeight = 0,
    } = props;
    const [width, setWidth] = useState(initialWidth ?? minWidth);
    const [height, setHeight] = useState(initialHeight ?? minHeight);
    const isResizing = useRef(false);
    const [cursorType, setCursorType] = useState<CursorType>('default');

    const overlap = useRef({
        isOverRight: false,
        isOverBottom: false,
        isOverLeft: false,
        isOverTop: false,
    });
    const handleCalculateCursorType = (e: MouseEvent) => {
        if (anchor.current && !isResizing.current) {
            const anchorReact = anchor.current.getBoundingClientRect();
            let isEwResize = false,
                isNsResize = false,
                isOverLeft = false,
                isOverRight = false,
                isOverBottom = false,
                isOverTop = false;

            if (props.left) {
                const rightToLeftOffset = e.clientX - anchorReact.left;
                isOverLeft = rightToLeftOffset < 5 && rightToLeftOffset > -1;
                isEwResize = isEwResize || isOverLeft;
            }
            if (props.right) {
                const leftToRightOffset = e.clientX - anchorReact.right;
                isOverRight = leftToRightOffset < 1 && leftToRightOffset > -5;
                isEwResize = isEwResize || isOverRight;
            }
            if (props.top) {
                const bottomToTopOffset = e.clientY - anchorReact.top;
                isOverTop = bottomToTopOffset < 1 && bottomToTopOffset > -5;
                isNsResize = isNsResize || isOverTop;
            }
            if (props.bottom) {
                const topToBottomOffset = e.clientY - anchorReact.bottom;
                isOverBottom = topToBottomOffset < 1 && topToBottomOffset > -5;
                isNsResize = isNsResize || isOverBottom;
            }
            setCursorType(
                isEwResize ? 'ew-resize' : isNsResize ? 'ns-resize' : 'default',
            );
            overlap.current = { isOverLeft, isOverRight, isOverBottom, isOverTop };
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isResizing.current && anchor.current) {
            const { isOverLeft, isOverRight, isOverBottom, isOverTop } = overlap.current;

            if (isOverLeft || isOverRight) {
                const anchorWidth = anchor.current.getBoundingClientRect().width;
                const widthOffset =
                    e.clientX -
                    anchor.current.getBoundingClientRect()[
                        isOverRight ? 'right' : 'left'
                    ];

                const newWidth = anchorWidth - (isOverRight ? -widthOffset : widthOffset);
                setWidth(newWidth > minWidth ? newWidth : minWidth);
            }

            if (isOverTop || isOverBottom) {
                const anchorHeight = anchor.current.getBoundingClientRect().height;
                const heightOffset =
                    e.clientY -
                    anchor.current.getBoundingClientRect()[
                        isOverBottom ? 'bottom' : 'top'
                    ];

                const newHeight =
                    anchorHeight - (isOverBottom ? -heightOffset : heightOffset);
                setHeight(newHeight > minHeight ? newHeight : minHeight);
            }
        }
    };

    const handleMouseDown = (e: MouseEvent) => {
        e.preventDefault();
        isResizing.current = true;
    };

    const handleMouseUp = () => {
        isResizing.current = false;
    };

    useEffect(() => {
        if (anchor.current) {
            anchor.current.addEventListener('mousedown', handleMouseDown);
            anchor.current.addEventListener('mousemove', handleCalculateCursorType);
        }
    }, [anchor]);

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            anchor.current?.removeEventListener('mousedown', handleMouseDown);
        };
    }, []);

    const style: React.CSSProperties = useMemo(() => {
        const result: React.CSSProperties = {
            cursor: cursorType,
        };
        if (props.left || props.right) {
            result.width = _.isNumber(width) ? `${width}px` : width;
        }
        if (props.top || props.bottom) {
            result.height = _.isNumber(height) ? `${height}px` : height;
        }
        return result;
    }, [props, cursorType, width, height]);

    return React.cloneElement(children, { style });
};

export default ResizableBox;
