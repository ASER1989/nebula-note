import React, {useState} from "react";
import {Tabs, TabPane} from "@client/components/tabs";
import {useStore} from "@client/utils/hooks/useStore";
import {reducer, sliceName, updateTemplateContentAction} from "@client/modules/snippetList/storeSlice";
import CodeEditor from "@client/components/codeEditor";
import {Dialog} from "@client/atoms/dialog";
import SaveForm from "@client/modules/_shared/template/saveForm";

type Props = {
  config: string;

}

export const Content = ({config}: Props) => {
  const [state, dispatch] = useStore({key: sliceName, reducer});
  const [saveShown, setSaveShown] = useState(false);

  const handleSaveShown = () => {
    setSaveShown(true);
  }
  const handleSaveClose = () => {
    setSaveShown(false);
  }

  const handleTemplateChange = (editorValue: string) => {
    dispatch(updateTemplateContentAction(editorValue));
  }

  return (
    <>
      <Tabs>
        <TabPane id='code' key='code' title='模板编辑'>
          <CodeEditor value={state?.template?.content} onChange={handleTemplateChange} onSave={handleSaveShown}/>
        </TabPane>
        <TabPane id='config' key='config' title='模板运行参数配置'>
          <CodeEditor value={config}/>
        </TabPane>
      </Tabs>
      <Dialog visible={saveShown} onClose={() => setSaveShown(false)} title='模板'>
        <SaveForm
          templateOption={{
            ...state?.template,
            filePath: state?.template?.filePath,
            content: state?.template?.content
          }}
          onClose={handleSaveClose}/>
      </Dialog>
    </>
  );
}
