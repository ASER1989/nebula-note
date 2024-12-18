import { useContext } from 'react';
import { MessageContext } from './context';

export const useMessage = () => {
    const { setContent, defaultButtonText } = useContext(MessageContext);
    const showMessage = (message: string, buttonText?: string) => {
        return new Promise<void>((resolve) => {
            setContent(message, () => resolve(), buttonText || defaultButtonText);
        });
    };

    return { showMessage } as const;
};
