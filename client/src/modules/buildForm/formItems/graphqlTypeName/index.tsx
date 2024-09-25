import React, { useState, useContext, useMemo } from 'react';
import type { ExtraState } from '../../types';
import Input from '@client/atoms/input';
import type { GraphqlSchema } from '@client/models/graphql/type';
import request from '@client/utils/request';
import { getSchemaRepeatMark } from '@client/models/graphql';
import SchemaTree from '@client/components/schemaTree';
import { FormItem } from '@client/components/form';
import { BuildFormContext } from '../../context';
import useMessage from '@client/atoms/message/useMessage';

export default function GraphqlTypeName() {
    const { formState, setFormState, setExtraState, setExtraRender } =
        useContext(BuildFormContext);
    const { showMessage } = useMessage();
    const [isLoading, setIsLoading] = useState(false);
    
    const hightLightKeys = useMemo(() => {
        return formState?.columnSortNames?.split(/[,\s]+/);
    }, [formState])
    
    const setSchema = (schema: GraphqlSchema) => {
        setExtraState?.((ownState) => {
            return {
                ...ownState,
                schema,
            };
        });
    };
    
    const handleSchemaChange = (newSchema: GraphqlSchema) => {
        const markedSchema = getSchemaRepeatMark(newSchema);
        setSchema(markedSchema);
    };
    
    const handleRequestSchema = (typeName: string) => {
        setIsLoading(true);
        request
            .get<GraphqlSchema>('/graphql/querySchemaByType', { typeName })
            .then((resp) => {
                setTimeout(() => setIsLoading(false), 1000);
                if (!resp.success) {
                    return showMessage(
                        resp.error?.toString() ?? '发生未知错误，Schema拉取失败！',
                    );
                }
                setSchema(resp.data);
            });
    };
    
    
    const expandRender = ({ schema }: ExtraState) => {
        if (isLoading) {
            return <div className='none_tip'>莫急，Schema解析中！</div>;
        }
        if (!schema) {
            return (
                <div className='none_tip'>
                    <p className='none_tip_title'>
                        没找到你要查询的Graphql类型，请按以下步骤进行排查！
                    </p>
                    <p>1、输入要查找的类型名称，该项不支持模糊匹配；</p>
                    <p>
                        2、检查类型名称是否正确，严格大小写检查，全词匹配，建议先在BFF查找；
                    </p>
                    <p>3、填写内容不支持Query名称，当然Mutation也是不可以的；</p>
                    <p>4、名称两端不能包含空格；</p>
                    <p>5、看看BFF是否已失联。</p>
                </div>
            );
        }
        return (
            <SchemaTree
                schema={schema}
                onSchemaChange={handleSchemaChange}
                lightKeys={hightLightKeys}
                enableRepeatMark
            />
        );
    };
    
    const handleModuleNameFocus = () => {
        setExtraRender('graphqlModuleName', expandRender);
    };
    
    const handleChange = (val: string) => {
        handleRequestSchema(val);
        setFormState?.((ownstate) => ({ ...ownstate, graphqlModuleName: val }));
    };
    
    return (
        <FormItem label='类型名称'>
            <Input
                placeholder='graphql type name'
                onFocus={handleModuleNameFocus}
                value={formState?.graphqlModuleName}
                onChange={handleChange}
            />
        </FormItem>
    );
}
