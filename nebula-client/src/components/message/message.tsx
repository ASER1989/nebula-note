import './index.styl';
import React, { FC, useContext } from 'react';
import Button from '@client/atoms/button';
import { MessageContext } from './context';

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
    const { setContent } = useContext(MessageContext);
    if (!content) {
        return null;
    }

    const handleClose = () => {
        if (onClose) {
            return onClose();
        }
        setContent?.(null);
    };

    return (
        <div className='message' onClick={handleClose} data-test-id={dataTestId}>
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
