import { DropdownOption } from '@nebula-note/ui';

export const SupportedLang = [
    'jsx',
    'json',
    'tsx',
    'javascript',
    'markdown',
    'typescript',
    'html',
    'yaml',
] as const;

export const getLangOptions = (): Array<
    DropdownOption<(typeof SupportedLang)[number]>
> => {
    const options = SupportedLang.map((item) => {
        return { value: item, label: item };
    });
    return options;
};
