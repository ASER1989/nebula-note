import React from 'react';
import { SidePage } from '@client/molecules/sidePage';
import { useRedux } from '@client/store/hooks/useRedux';
import { StateName } from '@client/modules/noteList/buildReuslt/constants';
import {
    BuildResultState,
    CodeSnippet,
} from '@client/modules/noteList/buildReuslt/types';
import CodeEditor from '@client/components/codeEditor';
import Copy from '@client/molecules/copy';
import { Stack, StackItem } from '@client/molecules/stack';
import ResizableBox from '@client/molecules/resizableBox';
import { TabPane, Tabs } from '@client/molecules/tabs';

export const BuildResult = () => {
    const { state, setState } = useRedux(StateName, {
        visible: false,
    } as BuildResultState);
    const sidePageRef = React.useRef<HTMLDivElement>(null);

    const handlePanelHide = () => {
        setState({ codeList: [], visible: false });
    };

    if (!state?.visible) {
        return;
    }

    const renderCodeBlock = (item: CodeSnippet) => {
        return (
            <Stack direction='vertical'>
                <StackItem flex style={{ overflow: 'auto' }}>
                    <CodeEditor
                        value={item.content}
                        showHeader={true}
                        editable={false}
                        lang={item.language}
                    />
                </StackItem>
                <StackItem
                    style={{
                        height: 30,
                        textAlign: 'right',
                        padding: 5,
                    }}
                >
                    <Copy code={item.content} />
                </StackItem>
            </Stack>
        );
    };
    const renderErrorBlock = (item: CodeSnippet) => {
        return (
            <>
                <CodeEditor
                    value={item.content}
                    showHeader={false}
                    editable={false}
                    lang={item.language}
                    basicSetup={{
                        lineNumbers: false,
                        foldGutter: false,
                        highlightActiveLine: false,
                    }}
                />
            </>
        );
    };

    return (
        <ResizableBox anchor={sidePageRef} initialWidth='50%' left={state?.visible}>
            <SidePage
                visible={state?.visible}
                onVisibleChange={handlePanelHide}
                ref={sidePageRef}
            >
                <Tabs>
                    {state?.codeList?.map((item, index) => (
                        <TabPane key={index} id={item.title} title={item.title}>
                            {item.status === 'success'
                                ? renderCodeBlock(item)
                                : renderErrorBlock(item)}
                        </TabPane>
                    ))}
                </Tabs>
            </SidePage>
        </ResizableBox>
    );
};
