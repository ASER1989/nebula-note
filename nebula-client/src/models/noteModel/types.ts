import {SupportedLang} from "@client/components/codeEditor/queries";
import {FetchStatus} from "@client/types";

export type TemplateRecord = {
    title: string;
    language?: (typeof SupportedLang)[number];
    content?: string;
};
export type NoteRecord = {
    filePath: string;
    keyword?: string;
    name: string;
    version?: number;
    document?: string;
    meta?: string;
    templateList?: Array<TemplateRecord>;
};

export type NoteConfigState = {
    noteList: Array<NoteRecord>;
    keyword?: string;
    fetchStatus?: FetchStatus;
    createDialogState?: {
        visible: boolean;
    };
};
