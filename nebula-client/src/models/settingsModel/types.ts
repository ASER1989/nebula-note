import { FetchStatus } from '@client/types';
import {Language} from "@client/localizations/types";

export type Settings = {
    lang: Language;
    servicePort: number;
    autoSave: boolean;
    dataSource: Array<{
        path: string;
        isActive: boolean;
    }>;
};

export type SettingsState = {
    settings?: Settings;
    fetchStatus: FetchStatus;
    error?: string;
};
