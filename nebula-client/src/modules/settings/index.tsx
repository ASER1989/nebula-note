import React from 'react';
import './index.styl';
import { Tabs, TabPane } from '@client/molecules/tabs';
import SystemConfig from '@client/modules/settings/systemConfig';

export default function Settings() {
    return (
        <Tabs activePaneId={'systemConfig'}>
            <TabPane id='systemConfig' title='系统配置'>
                <SystemConfig />
            </TabPane>
        </Tabs>
    );
}
