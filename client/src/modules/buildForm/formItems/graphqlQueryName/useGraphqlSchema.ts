import React, { useState, useContext, useMemo, useRef, useEffect } from 'react';
import request from '@client/utils/request';
import { GraphqlSchema } from '@client/models/graphql/type';
import useMessage from '@client/components/message/useMessage';
import { buildSchemaTree, getSchemaByQueryName } from '@client/utils/graphql/schema';
import { IntrospectionQuery } from 'graphql';

export default function useGraphqlSchema() {
    const { showMessage } = useMessage();
    const [schema, setSchema] = useState<IntrospectionQuery>();

    const query = (queryName: string | null, preciseMatch: boolean = false) => {
        const querySchema = getSchemaByQueryName(schema, queryName, preciseMatch);
        if (!preciseMatch) {
            return querySchema;
        }

        const newSchemaTree = buildSchemaTree(
            schema,
            querySchema as any,
            undefined,
            undefined,
        );
        return newSchemaTree;
    };

    const fetchSchema = () => {
        request.get<GraphqlSchema>('/graphql/schema').then((resp) => {
            if (!resp.success) {
                return showMessage(
                    resp.error?.toString() ?? '发生未知错误，Schema拉取失败！',
                );
            }
            setSchema(resp.data as any);
        });
    };

    useEffect(() => {
        fetchSchema();
    }, []);

    return query;
}
