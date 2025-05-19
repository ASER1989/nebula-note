import React, { Suspense, lazy } from 'react';
import type { Props as IProps } from './codeMirror';

const Editor = lazy(() => import('./codeMirror'));

export type Props = IProps;
const CodeEditor = (props: IProps) => {
    return (
        <Suspense fallback={<div>loading...</div>}>
            <Editor {...props} />
        </Suspense>
    );
};
export default CodeEditor;
