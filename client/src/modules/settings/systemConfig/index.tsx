import React, { useState, useEffect, useMemo } from 'react';
import '../index.styl';
import Button from '@client/atoms/button';
import { FiSave } from 'react-icons/fi';
import useMessage from '@client/components/message/useMessage';
import useSettings from '@client/models/settingsModel/useSettings';
import Form, { FormItem } from '@client/molecules/form';
import Input from '@client/atoms/input';
import Switch from '@client/atoms/switch';
import Dropdown from '@client/atoms/dropdown';
import { Stack, StackItem } from '@client/molecules/stack';
import FolderPicker from "@client/modules/settings/folderPicker";

export default function SystemConfig() {
    const { showMessage } = useMessage();
    const { settings, updateSettingState } = useSettings();

    console.log(settings)
    const handleSettingsChange = (field: string, value: unknown) => {
        updateSettingState({ [field]: value });
    };
    return (
        <div className='module-settings'>
            <div className='settings-content'>
                <Form>
                    <FormItem label='本地端口'>
                        <Input
                            value={settings?.servicePort}
                            onChange={(value) =>
                                handleSettingsChange('serverPort', value)
                            }
                        />
                    </FormItem>
                    <FormItem label='自动保存'>
                        <Switch
                            value={settings?.autoSave ?? false}
                            onChange={(value) => handleSettingsChange('autoSave', value)}
                        />
                    </FormItem>
                    <FormItem label='文档目录'>
                        <Stack spacing={10}>
                            <StackItem flex>
                                <Dropdown options={[1, 2, 3]} />
                            </StackItem>
                            <StackItem>
                               <Button onClick={()=>undefined}>选择</Button>
                            </StackItem>
                        </Stack>
                    </FormItem>
                </Form>
            </div>
            <div className='footer'>
                <Button onClick={() => 0} type='primary' disabled={!settings}>
                    <FiSave />
                    保存
                </Button>
            </div>
            <FolderPicker></FolderPicker>
        </div>
    );
}
