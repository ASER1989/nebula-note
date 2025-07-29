import './index.styl';
import React from 'react';
import { Crepe } from '@milkdown/crepe';
import '@milkdown/crepe/theme/common/style.css';
import '@milkdown/crepe/theme/frame.css';
import { automd } from '@milkdown/plugin-automd';
import { commonmark } from '@milkdown/preset-commonmark';
import { Milkdown, MilkdownProvider, useEditor } from '@milkdown/react';

export interface MarkdownEditorProps {
    children?: string;
    isLoading?: boolean;
    id: string;
    onChange?: (value: string) => void;
}

const CrepeEditor = ({ children, onChange, isLoading, id }: MarkdownEditorProps) => {

    useEditor((root) => {
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
    },[id]);

    return <Milkdown />;
};

export const MilkdownEditorWrapper = (props: MarkdownEditorProps) => {
    return (
        <div className='nebula-markdown'>
            <MilkdownProvider>
                <CrepeEditor {...props} />
            </MilkdownProvider>
        </div>
    );
};

export default MilkdownEditorWrapper;
