import './index.styl';
import React, { useContext } from 'react';
import Button from '@client/atoms/button';
import { Dialog } from '@client/molecules/dialog';
import { ConfirmContext } from './context';

export default function Confirm() {
    const { options, onClose } = useContext(ConfirmContext);

    if (!options) {
        return null;
    }

    const handleClose = () => {
        onClose(false);
    };

    const handleConfirm = () => {
        onClose(true);
    };

    return (
        <Dialog visible={options != null} onClose={handleClose} title={options.title}>
            <div className='confirm'>
                <div className='content'>{options.content}</div>
                <div className='bottom'>
                    <Button onClick={handleClose}>{options.cancelText}</Button>
                    <Button type='primary' onClick={handleConfirm}>
                        {options.confirmText}
                    </Button>
                </div>
            </div>
        </Dialog>
    );
}
