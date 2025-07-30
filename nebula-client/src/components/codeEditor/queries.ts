import { DropdownOption } from '@nebula-note/ui';

export const SupportedLang = [
    'jsx',
    'json',
    'tsx',
    'vue',
    'javascript',
    'typescript',
    'markdown',
    'html',
    'yaml',
    'shell',
    'mysql',
] as const;

export const SupportLanguageList = [
    ...SupportedLang,
    ...SupportedLang.map((lang) => `${lang}Language`),
    'parser',
    'htmlCompletionSource',
    'ContextTracker',
    'ExternalTokenizer',
    'LRParser',
    'languages',
    'completeFromList',
    'ifNotIn',
    'snippetCompletion',
    'LRLanguage',
    'LanguageDescription',
    'LanguageSupport',
    'NodeProp',
    'StreamLanguage',
    'Tag',
    'continuedIndent',
    'delimitedIndent',
    'foldInside',
    'foldNodeProp',
    'indentNodeProp',
    'parseMixed',
    'styleTags',
    'syntaxTree',
    'tags',
];

export const getLangOptions = (): Array<
    DropdownOption<(typeof SupportedLang)[number]>
> => {
    const options = SupportedLang.map((item) => {
        return { value: item, label: item };
    });
    return options;
};
