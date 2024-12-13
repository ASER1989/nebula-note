import React, { useContext } from 'react';
import Notification from '@client/molecules/notification';
import { NotificationContext } from './context';

export const NotificationBox = () => {
    const { noticeArray } = useContext(NotificationContext);

    return noticeArray.map((item, idx) => (
        <Notification
            duration={item.duration}
            message={item.content}
            type={item.type}
            key={item.referenceId}
            onClose={item.onClose}
            offset={`${70 * (idx + 1)}px`}
        ></Notification>
    ));
};
