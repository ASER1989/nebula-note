import './app.styl';
import React, { useEffect, useState } from 'react';
import {
    ConfirmBox,
    ConfirmContext,
    useConfirmContext,
} from '@client/components/confirmBox';
import {
    MessageBox,
    MessageContext,
    useMessageContext,
} from '@client/components/messageBox';
import {
    NotificationBox,
    NotificationContext,
    useNotificationContext,
} from '@client/components/notificationBox';
import { useLocalization } from '@client/localizations/useLocalization';
import { NoteStatus } from '@client/modules/noteList/noteStatus';
import Settings from '@client/modules/settings';
import routeConfig from '@client/routeConfig';
import { useShell } from '@client/useShell';
import { SidePage } from '@nebula-note/ui';
import classNames from 'classnames';
import { LuSettings } from 'react-icons/lu';
import { useRoutes } from 'react-router-dom';
import packageConfig from '../../package.json';

function App() {
    const { getText } = useLocalization();
    const messageContextValue = useMessageContext();
    const notificationContextValue = useNotificationContext();
    const confirmContextValue = useConfirmContext();
    const [settingsVisible, setSettingsVisible] = useState(false);
    const { layoutCssVariables } = useShell();

    const routes = useRoutes(routeConfig);

    const handleSettingsClose = () => {
        setSettingsVisible(false);
    };

    return (
        <MessageContext.Provider
            value={{ ...messageContextValue, defaultButtonText: getText('确定') }}
        >
            <ConfirmContext.Provider value={confirmContextValue}>
                <NotificationContext.Provider value={notificationContextValue}>
                    <div className='app_layout' style={layoutCssVariables}>
                        <div className='app_layout_content'>
                            {routes}
                            <SidePage
                                visible={settingsVisible}
                                onVisibleChange={handleSettingsClose}
                                style={{ width: '50%' }}
                            >
                                <Settings />
                            </SidePage>
                        </div>
                        <div className='app_layout_footer'>
                            <div className='app_layout_footer_copyright'>
                                <div>Nebula Note v{packageConfig.version}</div>
                                <div>aser1989.cn&copy;2024</div>
                            </div>
                            <div className='app_layout_footer_operation'>
                                <NoteStatus />
                                <LuSettings
                                    title='设置'
                                    className={classNames('app_operate', {
                                        active: settingsVisible,
                                    })}
                                    onClick={() => setSettingsVisible(true)}
                                />
                            </div>
                        </div>
                        <NotificationBox />
                        <MessageBox key={messageContextValue.lastUpdateTime} />
                        <ConfirmBox />
                    </div>
                </NotificationContext.Provider>
            </ConfirmContext.Provider>
        </MessageContext.Provider>
    );
}

export default App;
