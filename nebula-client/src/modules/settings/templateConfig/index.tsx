import '../index.styl';
import React, { useEffect, useMemo, useState } from 'react';
import Button from '@client/atoms/button';
import CodeEditor from '@client/components/codeEditor';
import useMessage from '@client/components/message/useMessage';
import { useNoteConfig } from '@client/models/noteModel';
import request from '@client/utils/request';
import { FiSave } from 'react-icons/fi';

export default function TemplateConfig() {
    const { showMessage } = useMessage();
    const [config, setConfig] = useState<unknown>();
    const [newConfig, setNewConfig] = useState<string>();
    const { reload } = useNoteConfig();

    const loadSettings = () => {
        request.get('/template/config').then((resp) => {
            if (resp.success) {
                setConfig(resp.data);
            }
        });
    };
    useEffect(() => {
        loadSettings();
    }, []);

    const configString = useMemo(
        () => (config ? JSON.stringify(config, null, '\t') : ''),
        [config],
    );

    const handleSettingsChange = (value: string) => {
        setNewConfig(value);
    };

    const onConfigSave = (newSettings: Record<string, unknown>) => {
        try {
            request.post('/template/config', { settings: newSettings }).then((resp) => {
                if (resp.success) {
                    reload();
                    return showMessage('保存成功！');
                }
                showMessage(resp.error.toString());
            });
        } catch (ex: any) {
            showMessage(ex.message.toString());
        }
    };
    const handleSave = () => {
        if (!newConfig) {
            return;
        }
        try {
            const newSettings = JSON.parse(newConfig);
            onConfigSave(newSettings);
        } catch (ex) {
            showMessage('配置反序列化失败，请检查文件格式！');
        }
    };

    return (
        <div className='module-settings'>
            <div className='settings-content'>
                <CodeEditor
                    value={configString}
                    onChange={handleSettingsChange}
                    minHeight={'500px'}
                    showHeader={false}
                    lang='json'
                />
            </div>
            <div className='footer'>
                <Button onClick={handleSave} type='primary' disabled={!newConfig}>
                    <FiSave />
                    保存
                </Button>
            </div>
        </div>
    );
}
