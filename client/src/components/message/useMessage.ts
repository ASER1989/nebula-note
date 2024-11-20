import { useContext } from 'react';
import { MessageContext } from './context';

export default function useMessage() {
    const { setContent } = useContext(MessageContext);
    const showMessage = (message: string) => {
        return new Promise<void>((resolve) => {
            setContent(message, () => resolve());
        });
    };

    return { showMessage } as const;
}
