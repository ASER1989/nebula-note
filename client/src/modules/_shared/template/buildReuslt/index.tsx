import React from "react";
import {SidePage} from "@client/molecules/sidePage";
import {useRedux} from "@client/store/hooks/useRedux";
import {StateName} from "@client/modules/_shared/template/buildReuslt/constants";
import {BuildResultState} from "@client/modules/_shared/template/buildReuslt/types";
import CodeEditor from "@client/components/codeEditor";
import Copy from "@client/molecules/copy";
import {Stack, StackItem} from "@client/molecules/stack";
import ResizableBox from "@client/molecules/resizeableBox";

export const BuildResult = () => {
  const [state, setState] = useRedux(StateName, {visible: false} as BuildResultState);
  const sidePageRef = React.useRef<HTMLDivElement>(null);

  const handlePanelHide = () => {
    setState({content: '', visible: false})
  }

  if(!state?.visible){
    return ;
  }

  return (
    <ResizableBox anchor={sidePageRef} initialWidth='50%' left={state?.visible}>
      {(style) => (
        <SidePage style={style} visible={state?.visible} onVisibleChange={handlePanelHide} ref={sidePageRef}>
          <Stack direction='column'>
            <StackItem flex style={{overflow: 'auto'}}>
              <CodeEditor value={state?.content} showHeader={true}/>
            </StackItem>
            <StackItem style={{height: 20, textAlign: 'right', padding: 5}}>
              <Copy code={state?.content}/>
            </StackItem>
          </Stack>
        </SidePage>
      )}
    </ResizableBox>
  )
}
