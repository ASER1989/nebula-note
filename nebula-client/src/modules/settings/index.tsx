import './index.styl';
import React from 'react';
import SystemConfig from '@client/modules/settings/systemConfig';
import { TabPane, Tabs } from '@client/molecules/tabs';

export default function Settings() {
    return (
        <Tabs activePaneId={'systemConfig'}>
            <TabPane id='systemConfig' title='系统配置'>
                <SystemConfig />
            </TabPane>
        </Tabs>
    );
}
