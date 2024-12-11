import React from 'react';
import SvgText from '@client/atoms/svgText';
import { useLocalization } from '@client/localizations/useLocalization';
import useNote from '@client/modules/noteList/useNote';

export const NoteStatus = () => {
    const { state } = useNote();
    const { getText } = useLocalization();
    if (state.editStatus === undefined || state.editStatus === 'None') {
        return null;
    }
    const fontColor = state.editStatus === 'Edited' ? 'orange' : '#666';
    return (
        <SvgText fontSize={10} height={20} color={fontColor}>
            {getText(state.editStatus)}
        </SvgText>
    );
};
