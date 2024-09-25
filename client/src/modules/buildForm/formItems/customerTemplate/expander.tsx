import React, {useState} from 'react';
import {Dialog} from "@client/components/dialog";
import CodeEditor from "@client/components/codeEditor";
import SaveForm from './saveForm';
import {ExtraState} from "@client/modules/buildForm/types";

type Props = {
    templateOption: ExtraState['customerTemplate'];
    onChange?: (value: ExtraState['customerTemplate']) => void;
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
        onChange?.({...templateOption, template: content});
    }
    return (
        <>
            <CodeEditor
                value={templateOption?.template ?? ''}
                title='Template'
                lang='typescript'
                onChange={handleContentChange}
                onSave={handleSaveShown}
            />
            <Dialog visible={saveShown} onVisibleChange={() => setSaveShown(false)} title='模板'>
                <SaveForm templateOption={templateOption} onClose={handleSaveClose}/>
            </Dialog>
        </>
    )
}