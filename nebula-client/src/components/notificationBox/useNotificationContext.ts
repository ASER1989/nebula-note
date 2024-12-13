import { useState } from 'react';
import type { INotificationContext, Notice } from './context';
import _ from 'lodash';

let referenceId = 0;
export const useNotificationContext: () => INotificationContext = () => {
    const [noticeArray, setNoticeArray] = useState<Array<Notice>>([]);

    const showNotice = (arg1: string | Omit<Notice, 'referenceId'>) => {
        let newNotice: Notice = arg1 as Notice;
        if (typeof arg1 === 'string') {
            newNotice = {
                content: arg1,
            } as Notice;
        }
        newNotice.referenceId = referenceId++;
        newNotice = ((options) => {
            const onClose = () => {
                setNoticeArray((ownState) =>
                    _.filter(
                        ownState,
                        (item) => item.referenceId !== options.referenceId,
                    ),
                );
                options.onClose?.();
            };
            return {
                ...options,
                onClose,
            };
        })(newNotice);

        setNoticeArray((ownState) => [newNotice, ...ownState]);
    };

    return {
        noticeArray,
        showNotice,
    };
};

export default useNotificationContext;
