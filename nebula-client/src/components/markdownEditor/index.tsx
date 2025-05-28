import React, { Suspense, lazy } from 'react';
import type { MarkdownEditorProps } from './tui';
import SuspenseLoading from '@client/components/suspenseLoading';

const Editor = lazy(() => import('./tui'));

const MarkdownEditor = (props: MarkdownEditorProps) => {
    return (
        <Suspense fallback={<SuspenseLoading />}>
            <Editor {...props} />
        </Suspense>
    );
};
export default MarkdownEditor;
