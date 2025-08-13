import './index.styl';
import React, { useRef } from 'react';
import { imageBlockComponent, imageBlockConfig } from '@milkdown/components/image-block';
import { Crepe } from '@milkdown/crepe';
import { automd } from '@milkdown/plugin-automd';
import { commonmark } from '@milkdown/preset-commonmark';
import { Milkdown, useEditor } from '@milkdown/react';

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

            crepe.editor.use(commonmark).use(imageBlockComponent).use(automd);

            crepe.editor.config((ctx) => {
                ctx.update(imageBlockConfig.key, (defaultConfig) => ({
                    ...defaultConfig,
                    onUpload: async (file: File) => {
                        const imgUrl = await onImageUpload?.(file);
                        if (!imgUrl) {
                            return '';
                        }
                        return imgUrl;
                    },
                }));
            });

            return crepe;
        },
        [id],
    );

    return <Milkdown />;
};

export default Editor;
