import { useEffect } from 'react';
import useSettings from '@client/models/settingsModel/useSettings';
import { useRedux } from '@client/store/hooks/useRedux';
import { Language } from './types';

export type Localization = {
    lang: Language;
    data: Record<string, string>;
};

export const useLocalization = () => {
    const { settings } = useSettings();
    const { state, setState } = useRedux<Localization>('localization', {
        lang: 'zh-cn',
        data: {},
    });

    useEffect(() => {
        if (settings?.lang) {
            setLocalization(settings.lang);
        }
    }, [settings?.lang]);

    const setLocalization = async (lang: Language) => {
        const newState = await import(`./data/${lang}.json`);
        setState({ lang, data: newState.default });
    };
    const getText = (key: string) => {
        return state?.data?.[key] ?? key;
    };
    return {
        setLocalization,
        getText,
    };
};
