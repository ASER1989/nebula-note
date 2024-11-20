import {SupportedLang} from "@client/components/codeEditor/queries";

export type SnippetRecord = {
    title: string;
    language?: (typeof SupportedLang)[number];
    content?: string;
};
export type TemplateRecord = {
    filePath: string;
    keyword?: string;
    name: string;
    version?: number;
    document?: string;
    meta?: string;
    snippetList?: Array<SnippetRecord>;
};
