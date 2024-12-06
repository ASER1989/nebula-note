import './index.styl';
import React, { useMemo } from 'react';
import Checkbox from '@client/atoms/checkbox';
import SchemaTreeNode from '@client/components/schemaTree/treeNode';
import { TagType } from '@client/components/schemaTree/types';
import { deepthCheck } from '@client/models/graphql';
import type { GraphqlSchema } from '@client/models/graphql/type';

type Props = {
    schema?: GraphqlSchema;
    isToolbarVisible?: boolean;
    enableRepeatMark?: boolean;
    onSchemaChange: (schema: GraphqlSchema) => void;
    onTagClick?: (type: TagType, field: GraphqlSchema) => void;
    lightKeys?: Array<string>;
};

export default function SchemaTree({
    schema,
    onSchemaChange,
    isToolbarVisible = true,
    enableRepeatMark,
    lightKeys,
    onTagClick,
}: Props) {
    if (!schema) {
        return null;
    }

    const handleSchemaChange = (field: GraphqlSchema) => {
        if (!schema.fields) {
            return;
        }
        const index = schema.fields.findIndex((item) => field.key === item.key);

        // const newSchema = JSON.parse(JSON.stringify(schema));
        schema.fields[index] = field;
        onSchemaChange?.(schema);
    };

    const isAllChecked = useMemo<boolean>(() => {
        return schema.fields?.every((item) => item.isChecked) ?? false;
    }, [schema]);

    const handleCheckAll = (isChecked: boolean) => {
        const newFields = schema.fields?.map((field) => deepthCheck(field, isChecked));

        onSchemaChange?.({ ...schema, fields: newFields });
    };

    return (
        <div className='schemaTree'>
            {isToolbarVisible && (
                <div className='tool_bar'>
                    <Checkbox
                        label='全选'
                        value={isAllChecked}
                        onChange={handleCheckAll}
                    />
                </div>
            )}

            <div className='treeRoot'>
                {schema?.fields?.map((field) => {
                    field.key = field.key ?? field.name;
                    return (
                        <SchemaTreeNode
                            key={field.key}
                            field={field}
                            onFieldChange={handleSchemaChange}
                            enableRepeatMark={enableRepeatMark}
                            lightKeys={lightKeys}
                            onTagClick={onTagClick}
                        />
                    );
                })}
            </div>
        </div>
    );
}
