export const DefaultOptions = {
  selectOnLineNumbers: true,
  minimap: {enabled: false}, // 是否显示右侧迷你地图
  fontSize: 14, // 字体大小
  wordWrap: 'on', // 自动换行
  tabSize: 2, // 缩进大小
};

export const EjsTokenizer = {
  root: [
    [/<%-?=?/, 'delimiter.ejs'],   // EJS 开始符
    [/%>/, 'delimiter.ejs'],       // EJS 结束符
    [/<\w+/, 'tag'],               // HTML 标签
    [/\w+>/, 'tag'],               // HTML 标签结束
    [/".*?"/, 'string'],           // 字符串
    [/\b(if|for|else|while)\b/, 'keyword'], // 关键字
  ],
};

export const EjsThemeConfig={
  base: 'vs-light',
  inherit: true,
  rules: [
    { token: 'tag', foreground: '569CD6' },
    { token: 'delimiter.ejs', foreground: 'C586C0' },
    { token: 'string', foreground: 'CE9178' },
    { token: 'keyword', foreground: 'D16969', fontStyle: 'bold' },
  ],
}
