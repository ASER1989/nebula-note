import './index.styl';
import React, { useEffect, useState } from 'react';

type NotificationProps = {
    message: string;
    type?: 'success' | 'error' | 'info';
    duration?: number;
    onClose?: () => void;
    offset?: string;
};

const Notification: React.FC<NotificationProps> = ({
    message,
    type = 'info',
    duration = 5000,
    onClose,
    offset,
}) => {
    const [animationClass, setAnimationClass] = useState<'enter' | 'exit'>();

    useEffect(() => {
        setAnimationClass('enter');
        const timer = setTimeout(() => {
            setAnimationClass('exit');
            setTimeout(() => {
                if (onClose) onClose();
            }, 330);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div
            className='nebula-notification'
            style={{ '--notification-offset': offset } as React.CSSProperties}
        >
            <div className={`nebula-notification-ui ${type} ${animationClass}`}>
                <span>{message}</span>
                <button className='close-btn' onClick={() => setAnimationClass('exit')}>
                    ×
                </button>
            </div>
        </div>
    );
};

export default Notification;
