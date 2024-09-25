import React from 'react';
import './index.styl';
import {Tabs, TabPane} from "@client/components/tabs";
import SystemConfig from "@client/modules/settings/systemConfig";
import TemplateConfig from "@client/modules/settings/templateConfig";

export default function Settings() {
    return (
        <Tabs>
            <TabPane id='systemConfig' title="系统配置">
                <SystemConfig/>
            </TabPane>
            <TabPane id='tempConfig' title="模板配置">
                <TemplateConfig/>
            </TabPane>
        </Tabs>
    );
}
