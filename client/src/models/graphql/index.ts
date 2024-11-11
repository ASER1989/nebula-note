import type { GraphqlSchema } from './type';
import _ from 'lodash';

export const getFieldFlatArrayHighPerformance = (
    schema?: GraphqlSchema,
    prevResult?: Array<GraphqlSchema>,
): Array<GraphqlSchema> => {
    const fields: Array<GraphqlSchema> = prevResult ?? [];
    if (!schema) {
        return fields;
    }
    schema.fields?.forEach((item) => {
        if (item.fields) {
            getFieldFlatArrayHighPerformance(item, fields);
        }
        fields.push(_.omit(item, ['fields', 'deprecationReason']));
    });
    return fields;
};

export const getSchemaKeyRepeatMap = (
    schema: GraphqlSchema,
    fieldMap?: Record<string, number>,
) => {
    let schemaFieldMap = fieldMap ?? {};

    schema.fields?.forEach((field) => {
        if (field.isChecked) {
            schemaFieldMap[field.name] = (schemaFieldMap[field.name] ?? 0) + 1;
        }

        if (field.fields) {
            schemaFieldMap = getSchemaKeyRepeatMap(field, schemaFieldMap);
        }
    });
    return schemaFieldMap;
};

export const setRepeatMark = (
    schema: GraphqlSchema,
    fieldMap: Record<string, number>,
) => {
    schema.fields?.forEach((field) => {
        field.isRepeat = false;
        if (fieldMap[field.name] > 1 && field.isChecked) {
            field.isRepeat = true;
        }
        if (field.fields) {
            setRepeatMark(field, fieldMap);
        }
    });
    return schema;
};

export const getSchemaRepeatMark = (
    schema: GraphqlSchema,
    fieldMap?: Record<string, number>,
) => {
    const schemaFieldMap = getSchemaKeyRepeatMap(schema, fieldMap);
    return setRepeatMark(schema, schemaFieldMap);
};

export const deepthCheck = (schema: GraphqlSchema, isChecked: boolean) => {
    if (schema.isExpanded) {
        schema.fields?.forEach((field) => deepthCheck(field, isChecked));
    }
    schema.isChecked = isChecked;
    return schema;
};
