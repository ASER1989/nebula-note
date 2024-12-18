import './index.styl';
import React, { FC } from 'react';
import Button from '@ui/atoms/button';

export type Props = {
    content: string | null;
    buttonText: string;
    onClose?: () => void;
    ['data-test-id']?: string;
};

export const Message: FC<Props> = ({
    content,
    buttonText,
    onClose,
    'data-test-id': dataTestId,
}) => {
    if (!content) {
        return null;
    }

    const handleClose = () => {
        if (onClose) {
            return onClose();
        }
    };

    return (
        <div className='nebula-message' onClick={handleClose} data-test-id={dataTestId}>
            <div className='message-box'>
                <div className='content'>{content}</div>
                <div className='bottom'>
                    <Button type='primary' onClick={handleClose}>
                        {buttonText}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Message;
