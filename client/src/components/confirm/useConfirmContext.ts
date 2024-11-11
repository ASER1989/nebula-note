import { useState } from 'react';
import type { Props, EventCallback } from './context';

type MessageObject = {
    message: string;
    callback?: EventCallback;
};

export default function useConfirmContext() {
    const [, setMessageArray] = useState<Array<MessageObject>>([]);
    const [message, setMessage] = useState<string | null>(null);

    const showConfirm = (newMessage: string, callback?: EventCallback) => {
        setMessageArray((messages) => {
            messages.push({ message: newMessage, callback });
            return [...messages];
        });
        setMessage(newMessage);
    };
    const onClose = (confirm?: boolean) => {
        setMessageArray((messages) => {
            const deleteObj = messages.pop();
            const idx = messages.length;
            const newObj = messages[idx - 1];
            setMessage(newObj?.message);
            deleteObj?.callback?.(confirm);
            return [...messages];
        });
    };
    return {
        content: message,
        showConfirm,
        onClose,
    } as Props;
}
