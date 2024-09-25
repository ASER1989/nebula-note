import _ from "lodash";
import {
    buildClientSchema,
    GraphQLSchema,
    IntrospectionQuery,
    IntrospectionType,
    IntrospectionField,
    IntrospectionEnumValue,
} from "graphql";

type SchemaNode = Omit<IntrospectionType, 'enumValues'> & {
    type: IntrospectionField['type'];
    fields?: Array<SchemaNode>;
    inputFields?: Array<SchemaNode>;
    args?: Array<SchemaNode>;
    key?: string;
    typeChain?: Array<string>;
    isEnumObject?: boolean;
    isQueryObject?: boolean;
    isArrayObject?: boolean;
    isMutationObject?: boolean;
    isArgumentObject?: boolean;
    sortId?: number;
    enumValues?: Array<IntrospectionEnumValue>;

}

export const getSchemaByQueryName = (schemaIntrospection: IntrospectionQuery | undefined, queryName: string | null, preciseMatch: boolean = false) => {
    if (!schemaIntrospection) {
        return undefined;
    }
    const schema: GraphQLSchema = buildClientSchema(schemaIntrospection);
    const queryFields = schema.getQueryType()?.getFields();
    const queries = _.toArray(queryFields).map((item: any) => {
        item.isQueryObject = true;
        item.sortId = 0;
        return item;
    }) as Array<any>;

    const mutationFields = schema.getMutationType()?.getFields();
    const mutations = _.toArray(mutationFields).map((item: any) => {
        item.isMutationObject = true;
        item.sortId = 1;
        return item;
    })

    const operations = _.chain([...queries, ...mutations])
        .filter(item => {
            if (preciseMatch) {
                return item?.name === queryName;
            }
            return item?.name?.toLowerCase()?.includes(queryName?.toLowerCase()) || item?.description?.toLowerCase()?.includes(queryName?.toLowerCase());
        })
        .sortBy(['sortId'])
        .value();
    return {fields: operations};
}

export const getAllQueriesSchema = (schemaIntrospection: IntrospectionQuery) => {
    const schema = buildClientSchema(schemaIntrospection);
    const queries = schema.getQueryType()?.getFields();
    const fields = _.toArray(queries as any).map((item: SchemaNode) => {
        item.isQueryObject = true;
        return item;
    })
    return {fields};
}

export const getSchemaByTypeName = (schema: IntrospectionQuery, typeName: string): IntrospectionType | undefined => {
    return schema?.__schema.types.find((item) => item.name === typeName);
};


const resolveHelper = (type: any): string => {
    if (type.name) {
        return type.name;
    } else if (type.ofType) {
        return resolveHelper(type.ofType);
    }
    return 'undefined';
};


export const resolveNamedType = (fieldType: any) => {

    return resolveHelper(fieldType);
};

export const buildSchemaTree = (schema: IntrospectionQuery | undefined, node: SchemaNode | undefined, parentKey: string | undefined, typeChain: Array<string> | undefined) => {
    if (!schema) {
        return;
    }
    try {
        node?.fields?.forEach((field: SchemaNode) => {
            field.key = [parentKey, field.name]
                .filter((item) => item !== undefined)
                .join('.');

            const fieldType = resolveNamedType(field.type);

            // 类型链
            const fieldTypeChain: Array<string> = [..._.castArray(typeChain ?? [])];
            fieldTypeChain.push(fieldType);
            field.typeChain = fieldTypeChain;

            const chainCount = _.countBy(fieldTypeChain);
            if (chainCount[fieldType] > 2) {
                return;
            }

            if (fieldType) {
                const child = getSchemaByTypeName(schema, fieldType) as SchemaNode;
                if (child?.kind === 'ENUM') {
                    field.enumValues = [...(child.enumValues ?? [])];
                    field.isEnumObject = true;
                    field.fields = child.enumValues as any;
                    return;
                }
                if (field.type?.kind === 'LIST' || (field.type?.kind === 'NON_NULL' && field.type?.ofType?.kind === 'LIST')) {
                    field.isArrayObject = true;
                }
                if (field.isMutationObject) {
                    debugger
                    const childNode = buildSchemaTree(schema, {
                        fields: _.cloneDeep(field.args)
                    } as SchemaNode, field.key, fieldTypeChain,);
                    if (childNode && childNode.fields) {
                        field.fields = childNode?.fields?.map(item => {
                            item.isArgumentObject = true;
                            return item;
                        });
                    }
                } else if (child) {
                    const fields = child.inputFields ? _.cloneDeep(child.inputFields) : _.cloneDeep(child.fields);
                    const childNode = buildSchemaTree(schema, {
                        ...child,
                        fields
                    } as SchemaNode, field.key, fieldTypeChain,);
                    if (childNode && childNode.fields) {
                        field.fields = childNode?.fields;
                    }
                }
            }
        });
        return node;
    } catch (e) {
        return null;
    }
};