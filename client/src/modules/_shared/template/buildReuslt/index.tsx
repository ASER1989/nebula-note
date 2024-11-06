import React from "react";
import {SidePage} from "@client/components/sidePage";
import {useRedux} from "@client/store/hooks/useRedux";
import {StateName} from "@client/modules/_shared/template/buildReuslt/constants";
import {BuildResultState} from "@client/modules/_shared/template/buildReuslt/types";
import CodeEditor from "@client/components/codeEditor";

export const BuildResult = () => {
  const [state, setState] = useRedux(StateName, {} as BuildResultState);

  const handlePanelHide = () => {
    setState({...state, visible: false})
  }

  return (
    <SidePage visible={state?.visible} onVisibleChange={handlePanelHide}>
      <CodeEditor value={state?.content}/>
    </SidePage>
  )
}
