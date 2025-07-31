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
    const updateEnabledRef = useRef<boolean>(false);
    useEditor(
        (root) => {
            updateEnabledRef.current = false;
            const crepe = new Crepe({
                root,
                defaultValue: children,
                features: {
                    [Crepe.Feature.CodeMirror]: true,
                },
                featureConfigs: {
                    placeholder: {
                        text: '开始写点什么吧...',
                        mode: 'doc',
                    },
                },
            });
            crepe.on((editor) => {
                editor.markdownUpdated((Ctx, nextMarkdown) => {
                    if (currentIdRef.current !== id) {
                        currentIdRef.current = id;
                        return;
                    }
                    if (!updateEnabledRef.current) {
                        return;
                    }
                    onChange?.(nextMarkdown);
                });

                editor.focus((ctx) => {
                    updateEnabledRef.current = true;
                });
            });

            crepe.editor.use(commonmark).use(automd);

            return crepe;
        },
        [id],
    );

    return <Milkdown />;
};

export default Editor;
