module.exports = {
  parser: '@typescript-eslint/parser',  // 使用 TypeScript 解析器
  parserOptions: {
    ecmaVersion: 2020,                   // 允许解析最新的 ECMAScript 语法
    sourceType: 'module',                 // 允许使用 ES 模块
    ecmaFeatures: {
      jsx: true,                          // 启用 JSX
    },
  },
  settings: {
    react: {
      version: 'detect',                  // 自动检测 React 版本
    },
  },
  extends: [
    'eslint:recommended',                  // 使用推荐的 ESLint 规则
    'plugin:react/recommended',            // 使用推荐的 React 规则
    'plugin:@typescript-eslint/recommended', // 使用推荐的 TypeScript 规则
    // 'plugin:prettier/recommended'
  ],
  rules: {
    // 在这里添加你的自定义规则
  },
};
