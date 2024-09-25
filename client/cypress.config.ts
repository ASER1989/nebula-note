import {defineConfig} from "cypress";

export default defineConfig({
  projectId: 'e9ewgm',
  experimentalStudio:true,
  component: {
    experimentalSingleTabRunMode: false,
    specPattern: 'src/**/**/*.cy.{js,jsx,ts,tsx}', // 定义组件测试文件的路径
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
