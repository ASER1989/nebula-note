import React, { useState } from 'react';
import './index.styl';
import Button from '@client/atoms/button';
import Form, { FormItem } from '@client/molecules/form';
import Input from '@client/atoms/input';
import useMessage from '@client/components/message/useMessage';
import * as TemplateApi from '@client/models/template/api';
import Dialog from '@client/molecules/dialog';
import _ from 'lodash';
import Textarea from '@client/atoms/textarea';
import { TemplateRecord } from '@client/models/template/types';
import { useDispatch } from 'react-redux';
import { changeSelectedItem } from '@client/modules/snippetList/asyncThunks';
import {useTemplateConfig} from "@client/models/template";

type Props = {
    visible: boolean;
    onHide?: (success?: boolean) => void;
};

const initialState: TemplateRecord = {
    name: '',
    keyword: '',
    filePath: '',
    snippetList: [],
};
export default function Index({ visible, onHide }: Props) {
    const { showMessage } = useMessage();
    const dispatch = useDispatch();
    const {isTemplateExist} = useTemplateConfig();

    const [formState, setFormState] = useState<TemplateRecord>(initialState);
    const handleFieldChange = (key: string, value: string) => {
        setFormState((ownState) => {
            return {
                ...ownState,
                [key]: value,
            };
        });
    };

    const handleTemplateSave = () => {
        if(isTemplateExist(formState.name)){
            return;
        }
        TemplateApi.saveTemplate(formState).then((resp) => {
            if (resp.success) {
                return showMessage('保存成功！').then(() => {
                    dispatch(
                        changeSelectedItem({
                            ...formState,
                            filePath: `${formState.name}/`,
                        }) as never,
                    );
                    onHide?.(true);
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
