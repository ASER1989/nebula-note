import { SupportedLang } from '@client/components/codeEditor/queries';

export type BuildResultState = {
    content?: string;
    language?: (typeof SupportedLang)[number];
    visible: boolean;
};
