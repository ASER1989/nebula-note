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
import useNote from '@client/modules/noteList/useNote';
import Section from '@client/molecules/section';

export default function SystemConfig() {
    const { showMessage } = useMessage();
    const { fetchStatus, error, settings, updateSettingState } = useSettings();
    const nodeConfigModel = useNoteConfig();
    const { reset } = useNote();

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
        return updateSettingState({ [field]: value });
    };

    const handleNewDataSource = async (path: string) => {
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

        const isSuccess = await handleSettingsChange('dataSource', newDataSource);
        if (isSuccess) {
            reset();
        }
    };
    const handleDataSourceChange = async (option: DropdownOption) => {
        await handleNewDataSource(option.value);
    };
    
    useEffect(() => {
        if (fetchStatus === 'Error' && error !== undefined) {
            showMessage(error);
        }
    }, [fetchStatus, error]);

    return (
        <>
            <Stack direction='vertical'>
                <StackItem flex>
                    <Section margin={20}>
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
                                    onChange={(value) =>
                                        handleSettingsChange('autoSave', value)
                                    }
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
                                        <Button
                                            onClick={() => setFolderPickerVisible(true)}
                                        >
                                            选择
                                        </Button>
                                    </StackItem>
                                </Stack>
                            </FormItem>
                        </Form>
                    </Section>
                </StackItem>
            </Stack>
            <FolderPicker
                visible={folderPickerVisible}
                onChange={(path) => handleNewDataSource(path)}
                onClose={() => setFolderPickerVisible(false)}
            />
        </>
    );
}
