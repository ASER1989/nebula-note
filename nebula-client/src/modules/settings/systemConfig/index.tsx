import '../index.styl';
import React, { useEffect, useMemo, useState } from 'react';
import { useMessage } from '@client/components/messageBox';
import { Language } from '@client/localizations/types';
import { useLocalization } from '@client/localizations/useLocalization';
import { useNoteConfig } from '@client/models/noteModel';
import useSettings from '@client/models/settingsModel/useSettings';
import useNote from '@client/modules/noteList/useNote';
import FolderPicker from '@client/modules/settings/folderPicker';
import { Button } from '@nebula-note/ui';
import { Dropdown, DropdownOption, Option } from '@nebula-note/ui';
import { Input } from '@nebula-note/ui';
import { Switch } from '@nebula-note/ui';
import { Form, FormItem } from '@nebula-note/ui';
import { Section } from '@nebula-note/ui';
import { Stack, StackItem } from '@nebula-note/ui';

export default function SystemConfig() {
    const { showMessage } = useMessage();
    const { getText } = useLocalization();
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
    const handleLanguageChange = (value: Language) => {
        // setLocalization(value);
        return handleSettingsChange('lang', value);
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
            nodeConfigModel.reload();
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
                        <Form labelWidth='86px'>
                            <FormItem label={getText('系统语言')}>
                                <Dropdown
                                    value={settings?.lang}
                                    onChange={({ value }) => handleLanguageChange(value)}
                                >
                                    <Option value='zh-cn'>中文</Option>
                                    <Option value='en'>English</Option>
                                </Dropdown>
                            </FormItem>
                            <FormItem label={getText('本地端口')}>
                                <Input
                                    value={settings?.servicePort?.toString()}
                                    onChange={(value) =>
                                        handleSettingsChange('serverPort', value)
                                    }
                                />
                            </FormItem>
                            <FormItem label={getText('自动保存')}>
                                <Switch
                                    value={settings?.autoSave ?? false}
                                    onChange={(value) =>
                                        handleSettingsChange('autoSave', value)
                                    }
                                />
                            </FormItem>
                            <FormItem label={getText('文档目录')}>
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
                                            {getText('添加目录')}
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
