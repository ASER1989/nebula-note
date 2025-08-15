import { defaultKeymap } from '@codemirror/commands';
import { languages } from '@codemirror/language-data';
import { oneDark } from '@codemirror/theme-one-dark';
import { keymap } from '@codemirror/view';
import { codeBlockConfig } from '@milkdown/components/code-block';
import { Ctx } from '@milkdown/kit/ctx';
import { basicSetup } from 'codemirror';

const useCodeBlock = () => {
    const configSetup = (ctx: Ctx) => {
        ctx.update(codeBlockConfig.key, (defaultConfig) => ({
            ...defaultConfig,
            languages,
            extensions: [basicSetup, keymap.of(defaultKeymap)],
            renderLanguage: (language, selected) =>
                selected ? `✔ ${language}` : language,
        }));
    };
    return configSetup;
};

export default useCodeBlock;
