import './index.styl';
import React from 'react';
import FieldType from '@client/components/schemaTree/fieldType';
import { TagType } from '@client/components/schemaTree/types';
import { deepthCheck } from '@client/models/graphql';
import type { GraphqlSchema } from '@client/models/graphql/type';
import { Checkbox } from '@nebula-note/ui';
import { ExpandBox } from '@nebula-note/ui';
import { Input } from '@nebula-note/ui';
import classNames from 'classnames';
import FieldTags from './fieldTags';
import SchemaTree from './index';

type NodeProps = {
    key: string;
    enableRepeatMark?: boolean;
    field: GraphqlSchema;
    onFieldChange?: (field: GraphqlSchema) => void;
    onTagClick?: (type: TagType, field: GraphqlSchema) => void;
    lightKeys?: Array<string>;
};

const SchemaTreeNode = ({
    field,
    onFieldChange,
    enableRepeatMark,
    lightKeys,
    onTagClick,
}: NodeProps) => {
    const handleNameChange = (value: string) => {
        const newState = {
            ...field,
            name: value,
        };
        onFieldChange?.(newState);
    };
    const handleDescriptionChange = (value: string) => {
        const newState = {
            ...field,
            description: value,
        };
        onFieldChange?.(newState);
    };
    const handleCheck = (value: boolean) => {
        const newField = deepthCheck(field, value);
        onFieldChange?.(newField);
    };
    const handleExpanded = (value: boolean) => {
        const newState = {
            ...field,
            isExpanded: value,
        };
        onFieldChange?.(newState);
    };

    const handleChildFieldChange = (newField: GraphqlSchema) => {
        onFieldChange?.(newField);
    };

    const isHeightLight = (word: string) => {
        if (word && Array.isArray(lightKeys) && lightKeys.length > 0) {
            return lightKeys?.some((key) => key.length > 0 && word?.indexOf(key) >= 0);
        }
        return false;
    };

    return (
        <>
            <div className={classNames('tree_node', { expanded: field.isExpanded })}>
                <Checkbox value={field.isChecked} onChange={handleCheck} />
                <div
                    className={classNames('tree_node_name', {
                        repeatMark: enableRepeatMark && field.isRepeat,
                    })}
                    title={
                        enableRepeatMark && field.isRepeat ? '字段名称重复' : undefined
                    }
                >
                    <Input
                        border={false}
                        value={field.name}
                        light={isHeightLight(field.name)}
                        onChange={handleNameChange}
                    />
                    <FieldType field={field} />
                    <FieldTags field={field} onTagClick={onTagClick} />
                </div>
                <div className='tree_node_descrption'>
                    <Input
                        border={false}
                        value={field.description}
                        light={isHeightLight(field.description)}
                        onChange={handleDescriptionChange}
                    />
                </div>
                {field.fields && (
                    <div>
                        <ExpandBox value={field.isExpanded} onChange={handleExpanded} />
                    </div>
                )}
            </div>
            {field.isExpanded && (
                <div className='tree_node_indent'>
                    <SchemaTree
                        schema={field}
                        onSchemaChange={handleChildFieldChange}
                        isToolbarVisible={false}
                        enableRepeatMark={enableRepeatMark}
                        lightKeys={lightKeys}
                        key={field.key}
                    />
                </div>
            )}
        </>
    );
};

export default SchemaTreeNode;
