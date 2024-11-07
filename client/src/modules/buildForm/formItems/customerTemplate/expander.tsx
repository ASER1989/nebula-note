import React, {useState} from 'react';
import {Dialog} from "@client/molecules/dialog";
import CodeEditor from "@client/components/codeEditor";
import SaveForm from '../../../_shared/template/saveForm';
import {TemplateConfig} from "@client/models/template/types";

type Props = {
  templateOption: TemplateConfig;
  onChange?: (value: TemplateConfig) => void;
}

export default function Expander({templateOption, onChange}: Props) {
  const [saveShown, setSaveShown] = useState(false);

  const handleSaveShown = () => {
    setSaveShown(true);
  }
  const handleSaveClose = () => {
    setSaveShown(false);
  }
  const handleContentChange = (content: string) => {
    onChange?.({...templateOption, content});
  }
  return (
    <>
      <CodeEditor
        value={templateOption?.content ?? ''}
        title='Template'
        lang='typescript'
        onChange={handleContentChange}
        onSave={handleSaveShown}
      />
      <Dialog visible={saveShown} onClose={() => setSaveShown(false)} title='模板'>
        <SaveForm templateOption={templateOption ?? {}} onClose={handleSaveClose}/>
      </Dialog>
    </>
  )
}
