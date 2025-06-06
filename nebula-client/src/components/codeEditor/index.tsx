import React, { Suspense, lazy } from 'react';
import SuspenseLoading from '@client/components/suspenseLoading';
import type { Props as IProps } from './codeMirror';

const Editor = lazy(() => import('./codeMirror'));

export type Props = IProps;
const CodeEditor = (props: IProps) => {
    return (
        <Suspense fallback={<SuspenseLoading />}>
            <Editor {...props} />
        </Suspense>
    );
};
export default CodeEditor;
