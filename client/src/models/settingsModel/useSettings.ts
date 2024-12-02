import { useRedux } from '@client/store/hooks/useRedux';
import { FetchStatus } from '@client/types';
import { queryErrorMessage } from '@client/utils/queries';
import {Settings, SettingsState} from '@client/models/settingsModel/types';
import { useEffect } from 'react';
import { getSettings } from '@client/models/settingsModel/api';

const REDUX_KEY = 'settingsState';

export const useSettings = () => {
    const { state, setState, updateState } = useRedux<SettingsState>(REDUX_KEY, {
        fetchStatus: 'None',
    });
    const { fetchStatus,settings } = state;

    useEffect(() => {
        if (fetchStatus === 'None') {
            updateState({ fetchStatus: 'Pending' });
            getSettings()
                .then((resp) => {
                    setState({
                        fetchStatus: 'Success',
                        settings: resp.data,
                    });
                })
                .catch((ex) => {
                    const content = queryErrorMessage(ex);
                    setState({
                        fetchStatus: 'Error',
                        error: content,
                    });
                });
        }
    }, []);

    const saveSettings = (data: Settings) => {
        return saveSettings(data);
    }
    const updateSettingState = (data: Partial<Settings>)=>{
        updateState({settings:data});
    }

    return {
        fetchStatus,
        settings,
        updateSettingState,
        saveSettings
    }
};

export default useSettings;
