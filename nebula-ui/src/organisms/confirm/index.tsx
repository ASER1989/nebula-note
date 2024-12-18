import './index.styl';
import React from 'react';
import Button from '@ui/atoms/button';
import Dialog from '@ui/molecules/dialog';

export type ConfirmProps = {
    title?: string;
    content: string;
    cancelText?: string;
    confirmText?: string;
    onClose?: (confirm?: boolean) => void;
};
export const Confirm = ({
    title,
    content,
    cancelText,
    confirmText,
    onClose,
}: ConfirmProps) => {
    const handleClose = () => {
        onClose?.(false);
    };

    const handleConfirm = () => {
        onClose?.(true);
    };

    return (
        <Dialog visible={true} onClose={handleClose} title={title}>
            <div className='nebula-confirm' data-test-id='confirm'>
                <div className='content'>{content}</div>
                <div className='bottom'>
                    <Button onClick={handleClose} data-test-id='confirm-cancel'>
                        {cancelText}
                    </Button>
                    <Button
                        type='primary'
                        onClick={handleConfirm}
                        data-test-id='confirm-apply'
                    >
                        {confirmText}
                    </Button>
                </div>
            </div>
        </Dialog>
    );
};

export default Confirm;
