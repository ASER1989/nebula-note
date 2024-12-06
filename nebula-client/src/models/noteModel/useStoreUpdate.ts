import { useState } from 'react';
import useMessage from '@client/components/message/useMessage';
import { noteStoreUpdate } from './api';
import { useNoteConfig } from './index';

const useStoreUpdate = () => {
    const [loading, setLoading] = useState(false);
    const { reload } = useNoteConfig();
    const { showMessage } = useMessage();
    const refreshStore = () => {
        setLoading(true);
        noteStoreUpdate()
            .then((resp) => {
                if (!resp.success) {
                    return showMessage(resp.error.toString());
                }
                reload();
            })
            .finally(() => {
                setLoading(false);
            });
    };
    return { loading, refreshStore };
};

export default useStoreUpdate;
