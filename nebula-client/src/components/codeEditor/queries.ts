import { DropdownOption } from '@nebula-note/ui';

export const SupportedLang = [
    'jsx',
    'json',
    'tsx',
    'vue',
    'javascript',
    'typescript',
    'java',
    'csharp',
    'markdown',
    'html',
    'yaml',
    'shell',
    'mysql'
] as const;

export const getLangOptions = (): Array<
    DropdownOption<(typeof SupportedLang)[number]>
> => {
    const options = SupportedLang.map((item) => {
        return { value: item, label: item };
    });
    return options;
};
