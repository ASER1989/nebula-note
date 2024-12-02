import React, { useState, useEffect, useMemo } from 'react';
import '../index.styl';
import Button from '@client/atoms/button';
import { FiSave } from 'react-icons/fi';
import useMessage from '@client/components/message/useMessage';
import useSettings from "@client/models/settingsModel/useSettings";
import Form, {FormItem} from '@client/molecules/form';
import Input from "@client/atoms/input";
import Switch from "@client/atoms/switch";

export default function SystemConfig() {
    const { showMessage } = useMessage();
    const {settings, updateSettingState} = useSettings();

    const handleSettingsChange=(field:string,value:unknown)=>{
        updateSettingState({[field]: value});
    }
    return (
        <div className='module-settings'>
            <div className='settings-content'>
                <Form>
                    <FormItem label='本地端口'>
                        <Input value={settings?.servicePort}
                            onChange={(value) => handleSettingsChange('serverPort', value)}
                        />
                    </FormItem>
                    <FormItem label='自动保存'>
                        <Switch value={settings?.settings ?? false} onChange={(value)=>handleSettingsChange('autoSave',value)}/>
                    </FormItem>
                    <FormItem label='存储设置'>
                        <Input value={settings?.servicePort}
                               onChange={(value) => handleSettingsChange('serverPort', value)}
                        />
                    </FormItem>

                </Form>
            </div>
            <div className='footer'>
                <Button onClick={()=>0} type='primary' disabled={!settings}>
                    <FiSave />
                    保存
                </Button>
            </div>
        </div>
    );
}
