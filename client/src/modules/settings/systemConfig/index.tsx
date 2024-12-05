import React, { useState, useMemo, useEffect } from 'react';
import '../index.styl';
import Button from '@client/atoms/button';
import { FiSave } from 'react-icons/fi';
import useSettings from '@client/models/settingsModel/useSettings';
import Form, { FormItem } from '@client/molecules/form';
import Input from '@client/atoms/input';
import Switch from '@client/atoms/switch';
import Dropdown, { DropdownOption } from '@client/atoms/dropdown';
import { Stack, StackItem } from '@client/molecules/stack';
import FolderPicker from '@client/modules/settings/folderPicker';
import useMessage from '@client/components/message/useMessage';
import { useNoteConfig } from '@client/models/noteModel';

export default function SystemConfig() {
    const { showMessage } = useMessage();
    const { fetchStatus, error, settings, updateSettingState, saveSettings } =
        useSettings();
    const nodeConfigModel = useNoteConfig();
    const [folderPickerVisible, setFolderPickerVisible] = useState(false);

    const dataSourceOptions = useMemo(() => {
        return (settings?.dataSource || []).map((item) => ({
            value: item.path,
            label: item.path,
            keyword: item.path,
        }));
    }, [settings?.dataSource]);

    const dataSource = useMemo(() => {
        return settings?.dataSource?.find((item) => item.isActive)?.path;
    }, [settings?.dataSource]);

    const handleSettingsChange = (field: string, value: unknown) => {
        updateSettingState({ [field]: value });
    };

    const handleNewDataSource = (path: string) => {
        let isPathExist = false;
        const newDataSource =
            settings?.dataSource?.map((item) => {
                if (item.path === path) {
                    isPathExist = true;
                    return {
                        ...item,
                        isActive: true,
                    };
                } else {
                    return {
                        ...item,
                        isActive: false,
                    };
                }
            }) ?? [];

        if (!isPathExist) {
            newDataSource.push({
                path,
                isActive: true,
            });
        }

        handleSettingsChange('dataSource', newDataSource);
    };
    const handleDataSourceChange = (option: DropdownOption) => {
        handleSettingsChange(
            'dataSource',
            settings?.dataSource?.map((item) => {
                if (item.path === option.value) {
                    return {
                        ...item,
                        isActive: true,
                    };
                } else {
                    return {
                        ...item,
                        isActive: false,
                    };
                }
            }),
        );
    };

    const handleSave = async () => {
        if (settings) {
            const result = await saveSettings(settings);
            if (result) {
                nodeConfigModel.reload();
                showMessage('保存成功');
            }
        }
    };

    useEffect(() => {
        if (fetchStatus === 'Error' && error !== undefined) {
            showMessage(error);
        }
    }, [fetchStatus, error]);

    return (
        <div className='module-settings'>
            <div className='settings-content'>
                <Form>
                    <FormItem label='本地端口'>
                        <Input
                            value={settings?.servicePort?.toString()}
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
                        <Stack spacing={10} overflow='visible'>
                            <StackItem flex>
                                <Dropdown
                                    options={dataSourceOptions}
                                    value={dataSource}
                                    onChange={handleDataSourceChange}
                                />
                            </StackItem>
                            <StackItem>
                                <Button onClick={() => setFolderPickerVisible(true)}>
                                    选择
                                </Button>
                            </StackItem>
                        </Stack>
                    </FormItem>
                </Form>
            </div>
            <div className='footer'>
                <Button onClick={handleSave} type='primary' disabled={!settings}>
                    <FiSave />
                    保存
                </Button>
            </div>
            <FolderPicker
                visible={folderPickerVisible}
                onChange={(path) => handleNewDataSource(path)}
                onClose={() => setFolderPickerVisible(false)}
            />
        </div>
    );
}
