import './app.styl';
import React, { useState } from 'react';
import Confirm from '@client/components/confirm';
import { ConfirmContext } from '@client/components/confirm/context';
import useConfirmContext from '@client/components/confirm/useConfirmContext';
import { MessageBox, useMessageContext } from '@client/components/message';
import { MessageContext } from '@client/components/message/context';
import { useLocalization } from '@client/localizations/useLocalization';
import { NoteStatus } from '@client/modules/noteList/noteStatus';
import Settings from '@client/modules/settings';
import { SidePage } from '@client/molecules/sidePage';
import routeConfig from '@client/routeConfig';
import classNames from 'classnames';
import { LuSettings } from 'react-icons/lu';
import { useRoutes } from 'react-router-dom';
import packageConfig from '../../package.json';

function App() {
    const { getText } = useLocalization();
    const messageContextValue = useMessageContext();
    const {
        options: confirmOptions,
        showConfirm,
        onClose: onConfirmClose,
    } = useConfirmContext();
    const [settingsVisible, setSettingsVisible] = useState(false);

    const routes = useRoutes(routeConfig);

    return (
        <MessageContext.Provider
            value={{ ...messageContextValue, defaultButtonText: getText('确定') }}
        >
            <ConfirmContext.Provider
                value={{ options: confirmOptions, showConfirm, onClose: onConfirmClose }}
            >
                <div className='app_layout'>
                    {/*<div className='app_layout_header'>*/}
                    {/*    <div className='logo'>Nebula Note</div>*/}
                    {/*</div>*/}
                    <div className='app_layout_content'>
                        {routes}
                        <SidePage
                            visible={settingsVisible}
                            onVisibleChange={() => setSettingsVisible(false)}
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
                    <MessageBox key={messageContextValue.lastUpdateTime} />
                    <Confirm />
                </div>
            </ConfirmContext.Provider>
        </MessageContext.Provider>
    );
}

export default App;
