import './index.styl';
import React, { useContext } from 'react';
import { Confirm } from '@nebula-note/ui';
import { ConfirmContext } from './context';

export const ConfirmBox = () => {
    const { options, onClose } = useContext(ConfirmContext);

    if (!options) {
        return null;
    }
    return <Confirm {...options} onClose={onClose} />;
};
