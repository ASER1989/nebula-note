import React from 'react';
import { useLocalization } from '@client/localizations/useLocalization';
import useNote from '@client/modules/noteList/useNote';
import { IconButton } from '@nebula-note/ui';
import { PiArticleMediumDuotone } from 'react-icons/pi';
import { TbTextSize } from 'react-icons/tb';

export const MarkdownMode = () => {
    const { getText } = useLocalization();
    const { state, switchMarkdownMode } = useNote();

    const switchHandle = (type: 'Markdown' | 'Code') => {
        switchMarkdownMode(type);
    };

    if (!state.note?.name) {
        return null;
    }

    if (state.markdownMode === 'Code') {
        return (
            <IconButton onClick={() => switchHandle('Markdown')}>
                <TbTextSize size={17} title={getText('预览视图')} />
            </IconButton>
        );
    }
    return (
        <IconButton onClick={() => switchHandle('Code')}>
            <PiArticleMediumDuotone size={17} title={getText('代码视图')} />
        </IconButton>
    );
};

export default MarkdownMode;
