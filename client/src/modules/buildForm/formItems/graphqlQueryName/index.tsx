import React, {useContext, useMemo} from 'react';
import type {ExtraState, FormState} from '../../types';
import Input from '@client/atoms/input';
import type {GraphqlSchema} from '@client/models/graphql/type';
import {getSchemaRepeatMark} from '@client/models/graphql';
import SchemaTree from '@client/components/schemaTree';
import {FormItem} from '@client/molecules/form';
import {BuildFormContext} from '../../context';
import {TagType} from "@client/components/schemaTree/types";
import useGraphqlSchema from "./useGraphqlSchema";

export default function GraphqlQueryName() {
    const currentExtraName = 'graphqlModuleName';
    const {formState, extraState, setFormState, setExtraState, setExtraRender, extraName} =
        useContext(BuildFormContext);
    const schemaQuery = useGraphqlSchema();


    const hightLightKeys = useMemo(() => {
        return formState?.columnSortNames?.split(/[,\s]+/);
    }, [formState])

    const setIsLoading = (loading: boolean) => {
        setExtraState?.((ownState) => {
            return {
                ...ownState,
                loading,
            };
        });
    }

    const setSchema = (newSchema: GraphqlSchema) => {
        const schema = newSchema ? {...newSchema} : newSchema;

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

    const handleRequestSchema = (queryName: string | null, preciseMatch: boolean = false) => {
        setIsLoading(true);
        const schema = schemaQuery(queryName, preciseMatch);
        setSchema(schema as unknown as GraphqlSchema);
        setIsLoading(false);
    };

    const handleModuleNameFocus = () => {
        setExtraRender(currentExtraName, expandRender);
        if (!formState?.graphqlQueryName && !extraState?.loading && !extraState?.schema) {
            handleRequestSchema('');
        }
    };

    const handleChange = (val: string, preciseMatch = false) => {
        handleRequestSchema(val, preciseMatch);
        setFormState?.((ownstate) => ({...ownstate, graphqlQueryName: val}));
    };


    const handleSchemaTagClick = (type: TagType, field: GraphqlSchema) => {
        if (['query', 'mutation'].includes(type) && !field.fields) {
            handleChange(field.name, true);
        }
    }

    const expandRender = ({schema, loading}: ExtraState, {graphqlQueryName}: FormState) => {
        if (loading) {
            return <div className='none_tip'>莫急，Schema解析中！</div>;
        }
        if (!schema) {
            return (
                <div className='none_tip'>
                    <p className='none_tip_title'>
                        没找到你要查询的Graphql类型，请按以下步骤进行排查！
                    </p>
                    <p>1、输入要查找的query类型名称，忽略大小写，支持模糊匹配；</p>
                    <p>2、不支持Mutation查询；</p>
                    <p>3、名称两端不能包含空格；</p>
                    <p>4、看看BFF是否已失联。</p>
                </div>
            );
        }

        return (
            <SchemaTree
                schema={schema}
                onSchemaChange={handleSchemaChange}
                onTagClick={(type: TagType, field: GraphqlSchema) => handleSchemaTagClick(type, field)}
                lightKeys={hightLightKeys}
                enableRepeatMark
            />
        );
    };


    return (
        <FormItem label='查询名称'>
            <Input
                placeholder='graphql query name'
                onFocus={handleModuleNameFocus}
                value={formState?.graphqlQueryName}
                onChange={(value) => handleChange(value)}
            />
        </FormItem>
    );
}
