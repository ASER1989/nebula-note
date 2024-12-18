import './index.styl';
import React, { FC, useContext } from 'react';
import { MessageContext } from './context';
import { Message } from '@nebula-note/ui';

export const MessageBox: FC = () => {
    const { messageList } = useContext(MessageContext);
    const { setContent } = useContext(MessageContext);

    return messageList
        .filter((item) => item.content)
        .map((item, index) => {
            const { content, onClose, buttonText } = item;
            const handleClose = () => {
                if (onClose) {
                    return onClose();
                }
                setContent?.(null);
            };
            return (
                <Message
                    key={index}
                    content={content}
                    onClose={handleClose}
                    buttonText={buttonText}
                    data-test-id='message-box'
                />
            );
        });
};
export default MessageBox;
