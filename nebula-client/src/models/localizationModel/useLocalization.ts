import { useRedux } from '@client/store/hooks/useRedux';

type LocalLang = 'default' | 'zh-cn' | 'en';
export type Localization = {
    lang: LocalLang;
    data: Record<string, string>;
};

export const useLocalization = () => {
    const { state, setState } = useRedux<Localization>('localization', {
        lang: 'zh-cn',
        data: {},
    });

    const setLocalization = async (lang: LocalLang) => {
        const newState = await import(`../../localizations/${lang}.json`);
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
