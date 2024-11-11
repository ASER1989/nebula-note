import './index.styl';
import React from 'react';
import type { GraphqlSchema } from '@client/models/graphql/type';
import { TagType } from '@client/components/schemaTree/types';

type Props = {
    field?: GraphqlSchema;
    onTagClick?: (type: TagType, field: GraphqlSchema) => void;
};

export default function FieldTags({ field, onTagClick }: Props) {
    if (!field) {
        return null;
    }
    const handleTagClick = (type: TagType) => {
        onTagClick?.(type, field);
    };

    return (
        <div className='tags'>
            {field.isArgumentObject && <div className='tag argument'>Argument</div>}
            {field.isEnumObject && (
                <div className='tag enum' onClick={() => handleTagClick('enum')}>
                    Enum
                </div>
            )}
            {field.isQueryObject && (
                <div className='tag query' onClick={() => handleTagClick('query')}>
                    Query
                </div>
            )}
            {field.isMutationObject && (
                <div className='tag mutation' onClick={() => handleTagClick('mutation')}>
                    Mutation
                </div>
            )}
            {field.isArrayObject && (
                <div className='tag array' onClick={() => handleTagClick('array')}>
                    Array
                </div>
            )}
        </div>
    );
}
