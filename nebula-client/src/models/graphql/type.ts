export type GraphqlSchema = {
    kind: 'OBJECT' | 'ENUM';
    name: string;
    description: string;
    type: string;
    key: string;
    isChecked?: boolean;
    isExpanded?: boolean;
    isRepeat?: boolean;
    isEnumObject?: boolean;
    isArgumentObject?: boolean;
    isQueryObject?: boolean;
    isMutationObject?: boolean;
    isArrayObject?: boolean;
    deprecationReason?: string;
    fields?: Array<GraphqlSchema>;
    typeChain?: Array<string>;
};
