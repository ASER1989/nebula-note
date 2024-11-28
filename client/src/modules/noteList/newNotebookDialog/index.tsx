import React, { useState,FC } from 'react';
import './index.styl';
import Button from '@client/atoms/button';
import Form, { FormItem } from '@client/molecules/form';
import Input from '@client/atoms/input';
import useMessage from '@client/components/message/useMessage';
import * as noteApi from '@client/models/noteModel/api';
import Dialog from '@client/molecules/dialog';
import _ from 'lodash';
import Textarea from '@client/atoms/textarea';
import { NoteRecord } from '@client/models/noteModel/types';
import { useDispatch } from 'react-redux';
import { changeSelectedItem } from '@client/modules/noteList/asyncThunks';
import {useNoteConfig} from "@client/models/noteModel";

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
export const NewNotebookDialog:FC<Props> =({ visible, onHide }) =>{
    const { showMessage } = useMessage();
    const dispatch = useDispatch();
    const {isNoteExist} = useNoteConfig();

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
        if(isNoteExist(formState.name)){
            return;
        }
        noteApi.noteUpsert(formState).then((resp) => {
            if (resp.success) {
                onHide?.(true);
                return showMessage('保存成功！').then(() => {
                    dispatch(
                        changeSelectedItem({
                            ...formState,
                            filePath: `${formState.name}/`,
                        }) as never,
                    );
                });
            }
            showMessage(resp.error.toString());
        });
    };

    return (
        <Dialog visible={visible} onClose={onHide} title='新建笔记'>
            <div className='shared-template-save'>
                <div className='save-as-form'>
                    <Form labelWidth='50px'>
                        <FormItem label='标题'>
                            <Input onChange={_.partial(handleFieldChange, 'name')} />
                        </FormItem>
                        <FormItem label='关键词'>
                            <Textarea
                                onChange={_.partial(handleFieldChange, 'keyword')}
                                placeholder='方便搜索，分隔符随意'
                                rows={3}
                                resize='none'
                            />
                        </FormItem>
                    </Form>
                    <div className='button-group'>
                        <Button onClick={() => onHide?.()}>取消</Button>
                        <Button onClick={handleTemplateSave} type='primary'>
                            保存
                        </Button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}

export default NewNotebookDialog;
