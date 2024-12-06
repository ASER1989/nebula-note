import { useEffect } from 'react';
import { useRedux } from '@client/store/hooks/useRedux';
import { queryErrorMessage } from '@client/utils/queries';
import { getFolderList } from './api';
import { FolderPickerState } from './types';

const REDUX_KEY = 'folderPickerState';

export const useFolderPicker = () => {
    const { state, setState, updateState } = useRedux<FolderPickerState>(REDUX_KEY, {
        fetchStatus: 'None',
    });
    const { fetchStatus, folderList } = state;

    const loadFolderList = (folderPath?: string) => {
        updateState({ fetchStatus: 'Pending' });
        getFolderList(folderPath)
            .then((resp) => {
                setState({
                    fetchStatus: 'Success',
                    folderList: resp.data,
                });
            })
            .catch((ex) => {
                const content = queryErrorMessage(ex);
                setState({
                    fetchStatus: 'Error',
                    error: content,
                });
            });
    };
    useEffect(() => {
        if (fetchStatus === 'None') {
            loadFolderList();
        }
    }, []);

    return {
        fetchStatus,
        folderList,
        loadFolderList,
    };
};

export default useFolderPicker;
