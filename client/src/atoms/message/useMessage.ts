import React, { useContext } from 'react';
import { MessageContext } from './context';

export default function useMessage() {
    const { setContent } = useContext(MessageContext);
    const showMessage = (message: string) => {
        setContent(message);
    };
    const hideMessage = () => {
        setContent(null);
    };
    return { showMessage, hideMessage } as const;
}
