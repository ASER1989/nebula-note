import './index.styl';
import React, { useRef } from 'react';
import { codeBlockComponent } from '@milkdown/components/code-block';
import { imageBlockComponent } from '@milkdown/components/image-block';
import { Crepe } from '@milkdown/crepe';
import { automd } from '@milkdown/plugin-automd';
import { commonmark } from '@milkdown/preset-commonmark';
import { Milkdown, useEditor } from '@milkdown/react';
import useImageBlock from './config/useImageBlock';
import useCodeBlock from './config/useCodeBlock';

export interface EditorProps {
    children?: string;
    isLoading?: boolean;
    id: string;
    onChange?: (value: string) => void;
    onImageUpload?: (file: File) => Promise<string | undefined>;
}

export const Editor = ({ children, onChange, id, onImageUpload }: EditorProps) => {
    const currentIdRef = useRef<string>(id);
    const updateEnabledRef = useRef<boolean>(false);
    const imageBlockConfig = useImageBlock({ id, onImageUpload });
    const codeBlockConfig = useCodeBlock();

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

            crepe.editor
                .config(imageBlockConfig)
                .config(codeBlockConfig)
                .use(commonmark)
                .use(imageBlockComponent)
                .use(codeBlockComponent)
                .use(automd);

            return crepe;
        },
        [id],
    );

    return <Milkdown />;
};

export default Editor;
