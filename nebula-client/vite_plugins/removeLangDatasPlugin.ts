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
export default function removeLangDatasPlugin(includeList: string[]): Plugin {
    const match = (name?: string | string[]) => {
        if (!name) return false;
        if (Array.isArray(name)) {
            return name.some((n) => includeList.includes(n));
        }
        return includeList.includes(name.toLowerCase());
    };
    return {
        name: 'vite-plugin-include-lang-datas',
        enforce: 'pre',

        transform(code: string, id: string) {
            if (!id.includes('/@codemirror/language-data')) return;

            const ast = parse(code, {
                sourceType: 'module',
                plugins: ['jsx', 'typescript'],
            });

            traverse(ast, {
                // 保留 langs 对象中在 includeList 中的属性，其余移除
                VariableDeclarator(path) {
                    // 清理 languages 数组中无关语言
                    if (
                        t.isIdentifier(path.node.id, { name: 'languages' }) &&
                        t.isArrayExpression(path.node.init)
                    ) {
                        path.node.init.elements = path.node.init.elements.filter((el) => {
                            if (
                                t.isCallExpression(el) &&
                                t.isMemberExpression(el.callee) &&
                                t.isIdentifier(el.callee.object, {
                                    name: 'LanguageDescription',
                                }) &&
                                t.isIdentifier(el.callee.property, { name: 'of' }) &&
                                el.arguments.length === 1 &&
                                t.isObjectExpression(el.arguments[0])
                            ) {
                                const obj = el.arguments[0] as t.ObjectExpression;

                                let name: string | undefined;
                                let alias: string[] = [];

                                for (const prop of obj.properties) {
                                    if (
                                        t.isObjectProperty(prop) &&
                                        t.isIdentifier(prop.key)
                                    ) {
                                        const key = prop.key.name;
                                        const value = prop.value;
                                        if (key === 'name' && t.isStringLiteral(value)) {
                                            name = value.value;
                                        }
                                        if (
                                            key === 'alias' &&
                                            t.isArrayExpression(value)
                                        ) {
                                            alias = value.elements
                                                .filter((item) => t.isStringLiteral(item))
                                                .map((e) => e.value);
                                        }
                                    }
                                }

                                return match(name) || match(alias);
                            }

                            return true;
                        });
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
