export type NoticeSlice = {
    referenceId: number;
    type?: 'success' | 'error' | 'info';
    duration?: number;
    content: string;
};
export type Notice = NoticeSlice & {
    onClose?: () => void;
};

export interface INotification {
    noticeArray: Notice[];
    showNotice: (arg1: string | Omit<Notice, 'referenceId'>) => void;
}
