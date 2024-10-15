import './index.styl';
import React from 'react';
import type {GraphqlSchema} from '@client/models/graphql/type';
import SvgText from "@client/atoms/svgText";


type Props = {
  field?: GraphqlSchema;
};


export default function FieldType({field}: Props) {
  if (!field || !field.typeChain) {
    return null;
  }
  return (
    <div className='tags'>
      <div className='tag type'>
        <SvgText fontSize={10}>{(field.typeChain).at(-1)}</SvgText>
      </div>
    </div>
  );
}
