import './index.styl';
import React, { Suspense, lazy } from 'react';
import CodeEditor from '@client/components/codeEditor';
import SuspenseLoading from '@client/components/suspenseLoading';
import '@milkdown/crepe/theme/common/style.css';
import '@milkdown/crepe/theme/frame.css';
import { MilkdownProvider } from '@milkdown/react';

const Editor = lazy(() => import('./editor'));
export const MilkdownEditorWrapper = (props: any & { mode: 'Code' | 'Markdown' }) => {
    if (props.mode === 'Code') {
        return (
            <div className='nebula-markdown'>
                <CodeEditor
                    value={props.children}
                    lang='markdown'
                    disableLangChange
                    showHeader={false}
                    onChange={props.onChange}
                />
            </div>
        );
    }
    return (
        <div className='nebula-markdown'>
            <Suspense fallback={<SuspenseLoading />}>
                <MilkdownProvider>
                    <Editor {...props} />
                </MilkdownProvider>
            </Suspense>
        </div>
    );
};

export default MilkdownEditorWrapper;
