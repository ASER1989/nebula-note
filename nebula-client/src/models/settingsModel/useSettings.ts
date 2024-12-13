import { useEffect } from 'react';
import { useRedux } from '@client/store/hooks/useRedux';
import { queryErrorMessage } from '@client/utils/queries';
import * as Api from './api';
import { Settings, SettingsState } from './types';

const REDUX_KEY = 'settingsState';

let initFetchStatus: 'None' | 'Ready' = 'None';
export const useSettings = () => {
    const { state, getStateSync, setState, updateState, updateStateSync } =
        useRedux<SettingsState>(REDUX_KEY, {
            fetchStatus: 'None',
        });
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
        updateStateSync({ settings: data } as Partial<SettingsState>);
        const newState = getStateSync();
        if (newState.settings) {
            return saveSettings(newState.settings);
        }
    };

    useEffect(() => {
        if (initFetchStatus === 'None') {
            initFetchStatus = 'Ready';
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
