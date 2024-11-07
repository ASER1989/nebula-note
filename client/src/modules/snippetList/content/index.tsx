import React, {useState} from "react";
import {Tabs, TabPane} from "@client/molecules/tabs";
import {useReduxSlice} from "@client/store/hooks/useReduxSlice";
import {
  reducer,
  sliceName,
  updateTemplateContentAction,
  updateTemplateMetaAction
} from "@client/modules/snippetList/storeSlice";
import CodeEditor from "@client/components/codeEditor";
import {Dialog} from "@client/molecules/dialog";
import SaveForm from "@client/modules/_shared/template/saveForm";

export const Content = () => {
  const [state, dispatch] = useReduxSlice({key: sliceName, reducer});
  const [saveShown, setSaveShown] = useState(false);

  const handleSaveShown = () => {
    setSaveShown(true);
  }
  const handleSaveClose = () => {
    setSaveShown(false);
  }

  const handleContentChange = (editorValue: string) => {
    dispatch(updateTemplateContentAction(editorValue));
  }

  const handleMetaChange = (editorValue: string) => {
    dispatch(updateTemplateMetaAction(editorValue));
  }

  return (
    <>
      <Tabs>
        <TabPane id='code' key='code' title='模板编辑'>
          <CodeEditor value={state?.template?.content} onChange={handleContentChange} onSave={handleSaveShown}/>
        </TabPane>
        <TabPane id='meta' key='meta' title='模板运行参数配置'>
          <CodeEditor value={state?.template?.meta ??'{}'} onChange={handleMetaChange} onSave={handleSaveShown}/>
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
