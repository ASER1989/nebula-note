import { SupportedLang } from '@client/components/codeEditor/queries';

export type CodeSnippet = {
    title: string;
    content: string;
    language?: (typeof SupportedLang)[number];
    status: 'success' | 'error';
};
export type BuildResultState = {
    codeList: Array<CodeSnippet>;
    visible: boolean;
};
