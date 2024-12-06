import React, { useEffect, useRef } from 'react';

type Props = {
    children: React.ReactElement;
    onSave?: () => void;
};

export const ShortcutKeys: React.FC<Props> = ({ children, onSave }) => {
    const childRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (
                event.key === 's' &&
                (navigator.userAgent.match('Mac') ? event.metaKey : event.ctrlKey)
            ) {
                event.preventDefault();
                event.stopPropagation();
                onSave?.();
            }
        };

        const element = childRef.current;
        if (element) {
            window?.removeEventListener('keydown', handleKeyDown);
            element?.addEventListener('keydown', handleKeyDown);
        } else {
            window.addEventListener('keydown', handleKeyDown);
        }

        // Cleanup event listener on component unmount
        return () => {
            element?.removeEventListener('keydown', handleKeyDown);
            window?.removeEventListener('keydown', handleKeyDown);
        };
    }, [onSave]);

    // Clone the child element to add a ref
    return React.cloneElement(children, { ref: childRef });
};
export default ShortcutKeys;
