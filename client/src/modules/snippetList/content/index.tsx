import React from "react";
import {Tabs, TabPane} from "@client/components/tabs";
import {useStore} from "@client/utils/hooks/useStore";
import {reducer, sliceName,updateTemplateContentAction} from "@client/modules/snippetList/storeSlice";
import CodeEditor from "@client/components/codeEditor";

type Props = {
  config: string;

}

export const Content = ({config}: Props) => {
  const [state, dispatch] = useStore({key: sliceName, reducer});

  const handleTemplateChange = (editorValue: string) => {
    dispatch(updateTemplateContentAction(editorValue));
  }

  return (
    <Tabs>
      <TabPane id='code' key='code' title='模板编辑'>
        <CodeEditor value={state?.template?.content } onChange={handleTemplateChange} />
      </TabPane>
      <TabPane id='config' key='config' title='模板运行参数配置'>
        <CodeEditor value={config}/>
      </TabPane>
    </Tabs>
  );
}
