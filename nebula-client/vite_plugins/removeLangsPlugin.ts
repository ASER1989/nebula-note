import generate from '@babel/generator';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import * as t from '@babel/types';
import { Plugin } from 'vite';

/**
 * 创建 Vite 插件，仅保留 includeList 中的语言
 * @param includeList - 需要保留的语言名，如 ['apl', 'c']
 * @returns Vite 插件对象
 */
export default function removeLangsPlugin(includeList: string[]): Plugin {
    const _includeList = ['languages','StreamLanguage'].concat(includeList);
    return {
        name: 'vite-plugin-include-langs',
        enforce: 'pre',

        transform(code: string, id: string) {
            if (!id.includes('codemirror-extensions-langs')) return;

            const ast = parse(code, {
                sourceType: 'module',
                plugins: ['jsx', 'typescript'],
            });

            traverse(ast, {
                // 保留 langs 对象中在 includeList 中的属性，其余移除
                VariableDeclarator(path) {
                    if (
                        t.isIdentifier(path.node.id, { name: 'langs' }) &&
                        t.isObjectExpression(path.node.init)
                    ) {
                        path.node.init.properties = path.node.init.properties.filter(
                            (prop) => {
                                if (
                                    t.isObjectProperty(prop) &&
                                    t.isIdentifier(prop.key)
                                ) {
                                    return includeList.includes(prop.key.name);
                                }
                                return true;
                            },
                        );
                    }
                },

                // 只保留 includeList 中所需的 import
                ImportDeclaration(path) {
                    path.node.specifiers = path.node.specifiers.filter((spec) => {
                        const local = spec.local.name;
                        return _includeList.some(
                            (lang) => local === lang || local === `_${lang}`,
                        );
                    });

                    if (path.node.specifiers.length === 0) {
                        path.remove();
                    }
                },
            });

            const output = generate(ast, {}, code);
            return {
                code: output.code,
                map: null,
            };
        },
    };
}
