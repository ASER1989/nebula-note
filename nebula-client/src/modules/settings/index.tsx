import './index.styl';
import React from 'react';
import { useLocalization } from '@client/localizations/useLocalization';
import SystemConfig from '@client/modules/settings/systemConfig';
import { TabPane, Tabs } from '@nebula-note/ui';

export default function Settings() {
    const { getText } = useLocalization();
    return (
        <Tabs activePaneId={'systemConfig'}>
            <TabPane id='systemConfig' title={getText('系统配置')}>
                <SystemConfig />
            </TabPane>
        </Tabs>
    );
}
