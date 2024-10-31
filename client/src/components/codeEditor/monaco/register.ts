import {useEffect} from 'react';
import {useMonaco} from '@monaco-editor/react';

export const useMonacoRegister = () => {
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      monaco.languages.register({id: 'ejs'});
      monaco.languages.setMonarchTokensProvider('ejs', {
        tokenizer: {
          root: [
            [/<%-?=?/, 'delimiter.ejs'],   // EJS 开始符
            [/%>/, 'delimiter.ejs'],       // EJS 结束符
            [/<\w+/, 'tag'],               // HTML 标签
            [/\w+>/, 'tag'],               // HTML 标签结束
            [/".*?"/, 'string'],           // 字符串
            [/\b(if|for|else|while)\b/, 'keyword'], // 关键字
          ]
        }
      });
      monaco.editor.defineTheme('ejsTheme', {
        base: 'hc-light',
        inherit: true,
        rules: [
          {token: 'tag', foreground: '569CD6'},
          {token: 'delimiter.ejs', foreground: 'C586C0'},
          {token: 'string', foreground: 'CE9178'},
          {token: 'keyword', foreground: 'D16969', fontStyle: 'bold'},
        ],
        colors: {}
      });

      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        tsx: 'react',
      })



      // 注册自定义的 `typescript-tsx` 语言，扩展 TypeScript 来支持 TSX 的 HTML 标签
      monaco.languages.register({ id: 'tsx' });

      monaco.languages.setMonarchTokensProvider('tsx', {
        ...monaco.languages.getEncodedLanguageId('typescript') && {},
        tokenizer: {
          root: [
            [/<([A-Za-z]+[\w-]*)\b([^>]*)>/, 'tag'], // HTML 开始标签
            [/<\/([A-Za-z]+[\w-]*)>/, 'tag'],         // HTML 结束标签
            [/".*?"/, 'string'],                       // 字符串
            [/\b(if|else|return|function|const|let|var)\b/, 'keyword'], // 关键字
            [/[{}()\[\]]/, '@brackets'],              // 括号
            [/\b\d+(\.\d+)?\b/, 'number'],            // 数字
          ],
        },
      });
    }
  }, []);
  return monaco;
}
