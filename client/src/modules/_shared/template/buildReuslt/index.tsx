import React from "react";
import {SidePage} from "@client/components/sidePage";
import {useRedux} from "@client/store/hooks/useRedux";
import {StateName} from "@client/modules/_shared/template/buildReuslt/constants";
import {BuildResultState} from "@client/modules/_shared/template/buildReuslt/types";
import CodeEditor from "@client/components/codeEditor";
import Copy from "@client/molecules/copy";
import {Stack, StackItem} from "@client/molecules/stack";

export const BuildResult = () => {
  const [state, setState] = useRedux(StateName, {} as BuildResultState);

  const handlePanelHide = () => {
    setState({...state, visible: false})
  }

  return (
    <SidePage visible={state?.visible} onVisibleChange={handlePanelHide}>
      <Stack direction='column'>
        <StackItem flex>
          <CodeEditor value={state?.content} showHeader={true}/>
        </StackItem>
        <StackItem style={{height:20,textAlign:'right',padding:5}}>
          <Copy code={state?.content}/>
        </StackItem>
      </Stack>
    </SidePage>
  )
}
