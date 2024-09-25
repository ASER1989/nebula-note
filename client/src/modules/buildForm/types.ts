import type {Folder} from '@client/components/folderTree/types';
import type {GraphqlSchema} from '@client/models/graphql/type';
import type React from 'react';

export type FormState = {
    moduleName?: string;
    graphqlModuleName?: string;
    graphqlQueryName?: string;
    folderPath?: string;
    columnSortNames?: string;
};

export type ExtraState = {
    schema?: GraphqlSchema;
    folderTreeData?: Folder;
    customerTemplate?: {
        name?: string;
        path?: string;
        template?: string;
    };
    resizeTimestamp?: number;
    loading?: boolean;
};

export type ExtraRender = (
    extraState: ExtraState,
    formState: FormState,
) => React.ReactNode;
