import React, { useState } from 'react';
import './index.styl';
import classNames from 'classnames';
import Button from '@client/atoms/button';
import Form, { FormItem } from '@client/molecules/form';
import Input from '@client/atoms/input';
import Textarea from '@client/atoms/textarea';
import useMessage from '@client/components/message/useMessage';
import { TemplateConfig } from '@client/models/template/types';
import * as TemplateApi from '@client/models/template/api';
import { createTemplate } from '@client/models/template/api';

type Props = {
    templateOption: TemplateConfig;
    onClose?: () => void;
};

type FormState = {
    name?: string;
    keyword?: string;
    filePath?: string;
    description?: string;
};

export default function Index({ templateOption, onClose }: Props) {
    const { content, meta,document: doc } = templateOption ?? {};
    const { showMessage } = useMessage();
    const [isSaveAs, setIsSaveAs] = useState(false);
    const [formState, setFormState] = useState<FormState>({});
    const handleSaveAsClick = () => {
        setIsSaveAs(true);
    };

    const handleSaveAsCancel = () => {
        setIsSaveAs(false);
    };

    const handleFieldChange = (key: string, value: string) => {
        setFormState((ownState) => {
            return {
                ...ownState,
                [key]: value,
            };
        });
    };

    const handleSaveAsSubmit = () => {
        const postData = {
            ...formState,
            content,
            meta,
            document:doc
        };
        TemplateApi.createTemplate(postData).then((resp) => {
            if (resp.success) {
                onClose?.();
                return showMessage('保存成功！');
            }
            showMessage(resp.error.toString());
        });
    };

    const handleTemplateUpdate = () => {
        const postData = {
            filePath: templateOption?.filePath,
            content,
            meta,
            document:doc
        };
        TemplateApi.updateTemplate(postData).then((resp) => {
            if (resp.success) {
                onClose?.();
                return showMessage('保存成功！');
            }
            showMessage(resp.error.toString());
        });
    };

    return (
        <div className='shared-template-save'>
            {!isSaveAs && (
                <div
                    className={classNames('operation-item operate-list', {
                        hide: isSaveAs,
                    })}
                >
                    <div className='operate save' onClick={handleTemplateUpdate}>
                        保存
                    </div>
                    <div className='operate save-as' onClick={handleSaveAsClick}>
                        另存
                    </div>
                </div>
            )}
            {isSaveAs && (
                <div className='save-as-form'>
                    <Form labelWidth='90px'>
                        <FormItem label='模板名称'>
                            <Input
                                onChange={(value: string) =>
                                    handleFieldChange('name', value)
                                }
                            />
                        </FormItem>
                        <FormItem label='关键词'>
                            <Input
                                onChange={(value: string) =>
                                    handleFieldChange('keyword', value)
                                }
                                placeholder='方便搜索，分隔符随意'
                            />
                        </FormItem>
                        <FormItem label='文件路径'>
                            <Input
                                onChange={(value: string) =>
                                    handleFieldChange('filePath', value)
                                }
                                placeholder='templateRoot相对路径，便于文件引用及管理。eg：table/xxx.ejs'
                            />
                        </FormItem>
                        <FormItem label='模板描述'>
                            <Textarea
                                resize='none'
                                onChange={(value: string) =>
                                    handleFieldChange('description', value)
                                }
                                placeholder='留给健忘的自己，建议写详细些'
                            />
                        </FormItem>
                    </Form>
                    <div className='button-group'>
                        <Button onClick={handleSaveAsCancel}>取消</Button>
                        <Button onClick={handleSaveAsSubmit} type='primary'>
                            保存
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
