# Nebula Note

**Nebula Note**是一款面向所有人的可编程笔记软件。最初设计的目标用户是软件行业的从业者，尤其是 Web 前端开发者。开发者可以通过编程技巧，将数据与代码模板结合，快速生成新的代码内容。然而，Nebula Note 的使用场景并不限于此。它不仅适用于前端代码的生成，还能用于模板化文案创作，或处理任何需要快速替换、计算的内容任务。此外，它同样是一款优秀的内容管理工具，无论是存储文档、代码片段、数据，还是简单的文字记录，都是一个理想的选择。

## 起源

偷懒往往是推动进步的原动力。为了提升工作效率，我设计了一款小工具，用于结合代码片段与 GraphQL SDL 快速生成代码。由于功能丰富，界面可能显得稍微复杂一些。不过，软件是否好用本质上是一个哲学问题。就在思考这个问题的过程中，我萌生了新的创意，最终诞生了 Nebula Note。

## 功能

对于这样一个小工具，设计之初并没有想过要实现多么复杂、多么高级的功能，所以我对它的期望如下：

1. **管理代码片段，以便日后抄代码的时候不用在一堆的工程里去找。**
   日常工作中很难不写出几段异常经典的代码。可能是实现某个复杂的功能，也可能是解决了某个神秘的bug，又或者是优雅的完成了某项工作，总之每次要用的时候想写又觉得麻烦，毕竟已经实现过了，不需要再耗费那么多的头发。于是抄吧，代码可能在其他工程里，还可能涉及到好多个文件的调整。那这就不是一个片段，而是一套片段了。如果可以在一个工具中管理这些片段，又可以少掉好多根头发。并且没有多余的业务代码，出错的可能性也大幅降低了。
   <br>
2. **结合一些简单的数据快速生成业务代码/代码片段。**
   有些体力活不想做，但又避免不了，比如一个有数十个列的表格。 依照现代前端代码的组织方式（如Ant Design、ElementUI、Arco Design等），这些列都需要复制、粘贴、修改。如果有这么一个工具，可以 利用接口定义（如：Graphql SDL、Swagger）结合代码模板自动创建相关代码内容。
   <br>
3. **有简单的文档编辑和展示能力**
   代码的作用、使用方式、特殊操作等等都可能需要一些文档介绍。针对代码的设计思路、使用环境、注意事项等等都需要一些文档记录。同时也便于文档和代码的统一管理及阅读。
   <br>

**Nebula Note** 主要由三个部分组成：文档、运行参数和代码内容。

1. 文档采用 Markdown 格式编辑和展示，简洁易用。
2. 运行参数目前支持 JSON、YAML 等数据格式，用于管理数据内容，且为非必需项。
3. 代码内容可用于记录代码片段或完整的代码内容，还支持使用 EJS 进行编程，从简单的内容替换到复杂的函数组合，都能轻松实现。使用EJS代码模版结合运行参数可以实现简单的代码创建。 代码内容可以有多个，并支持嵌套引用。

**Nebula Note** 是一款专注于文档管理的工具，所有内容均以文档文件形式存储。可以通过 Git 实现多人协作与分布式存储。

## 开发
**Nebula Note** 使用yarn作为包管理工具，node>=18,yarn>=1.22.0。项目中使用到的技术栈大致如下：
+ **client：** React、Redux、Cypress、TypeScript、Vite;
+ **server：** Node、Koa、Koa-router、TypeScript、Rollup;
+ **shell:** Electron、TypeScript、Rollup;
+ **ui:** React、Stylus、Jest、Storybook、TypeScript、Rollup;

### 安装依赖
```bash
yarn install
```

### 启动开发环境
```bash
yarn start:dev
```
### 启动Shell开发环境
```bash
yarn start:pro
```
目前只支持MacOS，Windows版本未处理工具条设计， 效果不太友好。
