import React from 'react';
import { useLocalization } from '@client/localizations/useLocalization';
import useNote from '@client/modules/noteList/useNote';
import { SvgText } from '@nebula-note/ui';

export const NoteStatus = () => {
    const { state } = useNote();
    const { getText } = useLocalization();
    if (state.editStatus === undefined || state.editStatus === 'None') {
        return null;
    }
    const fontColor = state.editStatus === 'Edited' ? 'orange' : '#666';
    return (
        <div className='app_operation_box align-end'>
            <SvgText fontSize={10} height={15} color={fontColor} textAnchor='end'>
                {getText(state.editStatus)}
            </SvgText>
        </div>
    );
};
