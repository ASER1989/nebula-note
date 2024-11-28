import { useState } from 'react';
import useMessage from '@client/components/message/useMessage';
import { useNoteConfig } from './index';
import { noteStoreUpdate } from './api';

const useStoreUpdate = () => {
    const [loading, setLoading] = useState(false);
    const { reloadTemplateConfig } = useNoteConfig();
    const { showMessage } = useMessage();
    const refreshStore = () => {
        setLoading(true);
        noteStoreUpdate()
            .then((resp) => {
                if (!resp.success) {
                    return showMessage(resp.error.toString());
                }
                reloadTemplateConfig();
            })
            .finally(() => {
                setLoading(false);
            });
    };
    return { loading, refreshStore };
};

export default useStoreUpdate;
