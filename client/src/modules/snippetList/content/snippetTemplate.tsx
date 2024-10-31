import React from "react";
import CodeEditor from "@client/components/codeEditor";

type Props = {
  value: string
}
export const SnippetTemplate = (props: Props) => {
  const {value} = props;
  return <CodeEditor value={value}></CodeEditor>
}
