import {FetchStatus} from "@client/types";

export type Settings={
    servicePort: number;
    autoSave:boolean;
    dataConfig: Array<{
        path: string;
        isActive: boolean;
    }>;
}

export type SettingsState={
    settings?: Settings;
    fetchStatus: FetchStatus;
    error?: string;
}