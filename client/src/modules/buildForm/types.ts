import type { Folder } from '@client/components/folderTree/types';
import type { GraphqlSchema } from '@client/models/graphql/type';
import type React from 'react';
import { TemplateConfig } from '@client/models/template/types';

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
    customerTemplate?: TemplateConfig;
    resizeTimestamp?: number;
    loading?: boolean;
};

export type ExtraRender = (
    extraState: ExtraState,
    formState: FormState,
) => React.ReactNode;
