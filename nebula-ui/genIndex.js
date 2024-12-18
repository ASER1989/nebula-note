const fs = require('fs');
const path = require('path');

const componentDirs = ['atoms', 'molecules', 'organisms']; // 你组件的层级目录
const outputFile = './src/index.ts'; // 输出的 index.ts 文件路径

let exportStatements = 'import \'./index.styl\';\n';

// 扫描每个目录，自动生成导出语句
componentDirs.forEach((dir) => {
    const dirPath = path.join(__dirname, './src', dir);
    const dirArray = fs.readdirSync(dirPath);
    
    dirArray.forEach((item) => {
        exportStatements += `export * from './${dir}/${item}';\n`;
    });
});

// 将生成的导出语句写入 index.ts 文件
fs.writeFileSync(outputFile, exportStatements);

console.log('index.ts generated successfully!');
