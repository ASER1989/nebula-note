import React from "react";
import {List} from './list';
import {Content} from './content';
import ResizableSplit from "@client/components/resizableSplit";
import {useTemplateConfig} from "@client/models/template";

export const SnippetList = () => {
  const {templateConfig} = useTemplateConfig();

  return <ResizableSplit percentage={20} minWidth={270}>
    <List templateList={templateConfig}/>
    <Content config={'{}'} />
  </ResizableSplit>
}

export default SnippetList;
