import './index.styl';
import React, { useContext } from 'react';
import Button from '../button';
import { MessageContext } from '@client/atoms/message/context';

type Props = {
    content: string | null;
    onConfirm?: () => void;
};

export default function Message({ content, onConfirm }: Props) {
    const { setContent } = useContext(MessageContext);
    if (!content) {
        return null;
    }

    const handleClose = () => {
        if (onConfirm) {
            return onConfirm();
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
