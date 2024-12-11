import { useRef, useState } from 'react';
import { IMessageContext, MessageInstance } from './context';

export const useMessageContext = () => {
    const nextMessageId = useRef(0);
    const messageArray = useRef<Array<MessageInstance & { id: number }>>([]);
    const [lastUpdateTime, setLastUpdateTime] = useState(Date.now());

    const removeContent = (messageId: number) => {
        const index = messageArray.current.findIndex((item) => item.id === messageId);
        if (index !== -1) {
            messageArray.current.splice(index, 1);
        }
        setLastUpdateTime(Date.now());
    };
    const handleClose = (messageId: number, callback?: () => void) => {
        removeContent(messageId);
        callback?.();
    };
    const setContent = (content: string, onClose?: () => void, buttonText?: string) => {
        const messageId = nextMessageId.current++;
        messageArray.current.push({
            content,
            onClose: () => handleClose(messageId, onClose),
            buttonText: buttonText || 'ok',
            id: messageId,
        });
        setLastUpdateTime(Date.now());
        return messageId;
    };
    return {
        messageList: messageArray.current,
        setContent,
        removeContent,
        lastUpdateTime,
        defaultButtonText: 'ok',
    } as IMessageContext;
};
