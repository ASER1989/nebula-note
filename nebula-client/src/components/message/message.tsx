import './index.styl';
import React, {FC, useContext } from 'react';
import Button from '@client/atoms/button';
import { MessageContext } from './context';

export type Props = {
    content: string | null;
    onClose?: () => void;
};

export const Message:FC<Props> =({ content, onClose }) => {
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
        <div className='message' onClick={handleClose}>
            <div className='message-box'>
                <div className='content'>{content}</div>
                <div className='bottom'>
                    <Button type='primary' onClick={handleClose}>
                        知道了
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Message;
