import './index.styl';
import React from 'react';
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
    useEditor(
        (root) => {
            const crepe = new Crepe({
                root,
                defaultValue: children,
                featureConfigs: {
                    placeholder: {
                        text: '开始写点什么吧...',
                        mode: 'doc',
                    },
                },
            });
            crepe.on((lm) => {
                lm.markdownUpdated((Ctx, nextMarkdown) => {
                    onChange?.(nextMarkdown);
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
