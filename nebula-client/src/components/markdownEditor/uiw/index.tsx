import React, { FC, useEffect, useRef, useState } from 'react';
import { Stack, StackItem } from '@client/molecules/stack';
import MdEditor, { MDEditorProps } from '@uiw/react-md-editor';

export type Props = MDEditorProps & {
    children?: string;
};
export const MarkdownEditor: FC<Props> = (props) => {
    const {
        children,
        value,
        enableScroll = true,
        overflow = true,
        fullscreen = false,
        visibleDragbar = false,
    } = props;

    const stackRef = useRef<HTMLDivElement>(null);
    const [boxHeight, setBoxHeight] = useState(0);

    useEffect(() => {
        if (stackRef.current) {
            const height = stackRef.current.clientHeight;
            setBoxHeight(height);
        }
    }, [stackRef]);

    return (
        <Stack direction='vertical' ref={stackRef}>
            <StackItem flex>
                <MdEditor
                    {...props}
                    height={boxHeight}
                    overflow={overflow}
                    fullscreen={fullscreen}
                    value={value || children}
                    enableScroll={enableScroll}
                    visibleDragbar={visibleDragbar}
                    style={{ boxSizing: 'border-box' }}
                ></MdEditor>
            </StackItem>
        </Stack>
    );
};

export default MarkdownEditor;
