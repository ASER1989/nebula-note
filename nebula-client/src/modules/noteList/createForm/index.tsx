import './index.styl';
import React, { FC, useState } from 'react';
import Button from '@client/atoms/button';
import Input from '@client/atoms/input';
import Textarea from '@client/atoms/textarea';
import { useLocalization } from '@client/localizations/useLocalization';
import { useNoteConfig } from '@client/models/noteModel';
import { NoteRecord } from '@client/models/noteModel/types';
import useNoteController from '@client/modules/noteList/useNoteController';
import Dialog from '@client/molecules/dialog';
import Form, { FormItem } from '@client/molecules/form';
import _ from 'lodash';

type Props = {
    visible: boolean;
    onHide?: (success?: boolean) => void;
};

const initialState: NoteRecord = {
    name: '',
    keyword: '',
    filePath: '',
    templateList: [],
};
export const CreateForm: FC<Props> = ({ visible, onHide }) => {
    const { create } = useNoteConfig();
    const { getText } = useLocalization();
    const { changeSelectedItem } = useNoteController();
    const [formState, setFormState] = useState<NoteRecord>(initialState);
    const handleFieldChange = (key: string, value: string) => {
        setFormState((ownState) => {
            return {
                ...ownState,
                [key]: value,
            };
        });
    };

    const handleTemplateSave = () => {
        create(formState).then((resp) => {
            if (resp?.success) {
                onHide?.(true);
                changeSelectedItem({
                    ...formState,
                    filePath: `${formState.name}/`,
                });
            }
        });
    };

    return (
        <Dialog
            visible={visible}
            onClose={onHide}
            title={getText('新建')}
            data-test-id='note-create-form'
        >
            <div className='shared-template-save'>
                <div className='save-as-form'>
                    <Form labelWidth='50px'>
                        <FormItem label={getText('标题')}>
                            <Input
                                onChange={_.partial(handleFieldChange, 'name')}
                                data-test-id='note-name'
                            />
                        </FormItem>
                        <FormItem label={getText('关键词')}>
                            <Textarea
                                onChange={_.partial(handleFieldChange, 'keyword')}
                                placeholder={getText('便于搜索，分隔符随意')}
                                rows={3}
                                resize='none'
                                data-test-id='note-keyword'
                            />
                        </FormItem>
                    </Form>
                    <div className='button-group'>
                        <Button onClick={() => onHide?.()}>{getText('取消')}</Button>
                        <Button
                            onClick={handleTemplateSave}
                            type='primary'
                            data-test-id='form-submit'
                        >
                            {getText('保存')}
                        </Button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default CreateForm;
