import './index.styl';
import React, { FC, useContext } from 'react';
import { MessageContext } from '@client/components/message/context';
import Message from './message';

export const MessageBox: FC = () => {
    const { messageList } = useContext(MessageContext);

    return messageList.map((item, index) => {
        const { content, onClose } = item;
        return (
            <Message
                key={index}
                content={content}
                onClose={onClose}
                data-test-id='message-box'
            />
        );
    });
};
export default MessageBox;
