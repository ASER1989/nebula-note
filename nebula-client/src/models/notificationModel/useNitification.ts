import { useRedux } from '@client/store/hooks/useRedux';
import { INotification, Notice, NoticeSlice } from './types';

const REDUX_KEY = 'notificationState';
let referenceId = 0;
export const useNotification: () => INotification = () => {
    const { state, getStateSync, setState } = useRedux<Array<NoticeSlice>>(REDUX_KEY, []);
    const showNotice = (
        arg1: string | Omit<NoticeSlice, 'referenceId'>,
        type?: NoticeSlice['type'],
    ) => {
        let newNotice: Notice = arg1 as Notice;
        if (typeof arg1 === 'string') {
            newNotice = {
                content: arg1,
                type: type ?? 'info',
            } as Notice;
        }
        newNotice.referenceId = referenceId++;
        setState([newNotice, ...getStateSync()]);
    };

    const removeNotice = (referenceId: number) => {
        setState(getStateSync().filter((item) => item.referenceId !== referenceId));
    };
    return {
        noticeArray: state,
        showNotice,
        removeNotice,
    };
};

export default useNotification;
