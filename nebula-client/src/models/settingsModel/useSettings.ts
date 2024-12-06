import { useEffect } from 'react';
import { useRedux } from '@client/store/hooks/useRedux';
import { queryErrorMessage } from '@client/utils/queries';
import * as Api from './api';
import { Settings, SettingsState } from './types';

const REDUX_KEY = 'settingsState';

export const useSettings = () => {
    const { state, setState, updateState, takeOnce } = useRedux<SettingsState>(
        REDUX_KEY,
        {
            fetchStatus: 'None',
        },
    );
    const { fetchStatus, error, settings } = state;

    const loadSettings = () => {
        updateState({ fetchStatus: 'Pending', error: undefined });
        Api.getSettings()
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
    };

    const saveSettings = async (data: Settings) => {
        updateState({ fetchStatus: 'Pending', error: undefined });
        try {
            await Api.saveSettings(data);
            updateState({
                fetchStatus: 'Success',
            });
            return true;
        } catch (ex) {
            const content = queryErrorMessage(ex);
            updateState({
                fetchStatus: 'Error',
                error: content,
            });
        }
        return false;
    };
    const updateSettingState = (data: Partial<Settings>) => {
        return new Promise((resolve) => {
            takeOnce('updateState', () => {
                if (state.settings) {
                    saveSettings(state.settings).then((result) => resolve(result));
                }
                resolve(false);
            });
            updateState({ settings: data } as Partial<SettingsState>);
        });
    };

    useEffect(() => {
        if (fetchStatus === 'None') {
            loadSettings();
        }
    }, []);

    return {
        fetchStatus,
        error,
        settings,
        updateSettingState,
    };
};

export default useSettings;
