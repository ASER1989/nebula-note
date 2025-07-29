import './index.styl';
import React, { useRef } from 'react';
import { Crepe } from '@milkdown/crepe';
import { automd } from '@milkdown/plugin-automd';
import { commonmark } from '@milkdown/preset-commonmark';
import { Milkdown, useEditor } from '@milkdown/react';

export interface EditorProps {
    children?: string;
    isLoading?: boolean;
    id: string;
    onChange?: (value: string) => void;
}

export const Editor = ({ children, onChange, id }: EditorProps) => {
    const currentIdRef = useRef<string>(id);
    const rootRef = useRef<HTMLDivElement>(null);
    useEditor(
        (root) => {
            const crepe = new Crepe({
                root: rootRef.current ?? root,
                defaultValue: children,
                featureConfigs: {
                    placeholder: {
                        text: '开始写点什么吧...',
                        mode: 'doc',
                    },
                },
            });
            crepe.on((editor) => {

                editor.markdownUpdated((Ctx, nextMarkdown) => {
                    console.log("id==",id)
                    console.log("currentId==",currentIdRef.current);
                    if (currentIdRef.current !== id) {
                        currentIdRef.current = id;
                        return;
                    }
                    onChange?.(nextMarkdown);
                });
            });
            crepe.editor.use(commonmark).use(automd);

            return crepe;
        },
        [id, rootRef],
    );

    return (
        <div ref={rootRef}>
            <Milkdown />
        </div>
    );
};

export default Editor;
