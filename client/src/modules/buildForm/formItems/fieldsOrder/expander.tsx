import React, { useContext, useState } from 'react';
import './index.styl';
import { ExtraState, FormState } from '@client/modules/buildForm/types';
import { GraphqlSchema } from '@client/models/graphql/type';
import classNames from 'classnames';
import Checkbox from '@client/atoms/checkbox';
import { BuildFormContext } from '@client/modules/buildForm/context';

type Props = {
    extraState?: ExtraState;
    schemaList: Array<GraphqlSchema>;
    className?: string;
    title?: string;
};

export default function FieldsOrderExpander({ schemaList, className, title }: Props) {
    const { formState, setExtraState } = useContext(BuildFormContext);

    const [isMatchCheckedSchema, setIsMatchCheckedSchema] = useState(false);
    const [usePreciseMatch, setUsePreciseMatch] = useState(false);

    const columnList =
        formState?.columnSortNames?.split(/[,\s]+/)?.filter((item) => item !== '') ?? [];

    const filteredSchemaList = schemaList.filter((schema) => {
        if (!isMatchCheckedSchema) {
            return true;
        }
        return schema?.isChecked;
    }) as Array<GraphqlSchema>;

    const content = columnList.map((item) => {
        const matchedSchemas: Array<GraphqlSchema> | undefined =
            filteredSchemaList.filter((schema: GraphqlSchema) => {
                if (usePreciseMatch) {
                    return schema.description === item || schema.name === item;
                }
                return schema.description?.includes(item) || schema.name?.includes(item);
            });

        return {
            label: item,
            isMatched: matchedSchemas?.length > 0,
            matchedSchemas,
        };
    });

    const handleMatchedSchemaChange = (ischecked: boolean) => {
        setIsMatchCheckedSchema(ischecked);
    };

    const handleUsePreciseMatchChange = (precise: boolean) => {
        setUsePreciseMatch(precise);
    };

    const findSchemaOnSchemaTree = (
        schema: GraphqlSchema | undefined,
        currentKey: string,
    ) => {
        return schema?.fields?.find((node) => node.key === currentKey);
    };

    const handleSchemaCheck = (schema: GraphqlSchema) => {
        schema.isChecked = !schema.isChecked;

        setExtraState?.((ownState) => {
            const pathList = schema.key.split('.');
            let currentKey: string;
            let currentSchema: GraphqlSchema | undefined;

            pathList.forEach((path) => {
                currentKey = currentKey ? [currentKey, path].join('.') : path;
                currentSchema = findSchemaOnSchemaTree(
                    currentSchema ?? ownState.schema,
                    currentKey,
                );
            });
            if (currentSchema) {
                currentSchema.isChecked = schema.isChecked;
            }

            return {
                ...ownState,
            };
        });
    };

    return (
        <div className='fields-orders-expander'>
            <div className='fields-list-title'>
                <span> {title}</span>
                <div className='operation-list'>
                    <Checkbox
                        value={usePreciseMatch}
                        label='精确查找'
                        onChange={handleUsePreciseMatchChange}
                    />
                    <Checkbox
                        value={isMatchCheckedSchema}
                        label='匹配已选择节点'
                        onChange={handleMatchedSchemaChange}
                    />
                </div>
            </div>
            <div className={classNames('fields-list', className)}>
                {content.map((item) => {
                    return (
                        <div
                            className={classNames('column', {
                                'height-light': item.isMatched,
                            })}
                        >
                            <div>{item.label}</div>
                            {item.isMatched && (
                                <div className='matched-field-list'>
                                    {item.matchedSchemas.map((schema) => {
                                        return (
                                            <div
                                                className={classNames({
                                                    checked: schema.isChecked,
                                                })}
                                                onClick={() => handleSchemaCheck(schema)}
                                            >
                                                {schema?.key ?? ''}--
                                                {schema?.description ?? ''}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
