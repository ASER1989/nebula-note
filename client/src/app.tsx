import React, { useState } from 'react';
import './app.styl';
import { MessageContext } from '@client/components/message/context';
import { MessageBox, useMessageContext } from '@client/components/message';
import packageConfig from '../../package.json';
import { LuSettings } from 'react-icons/lu';
import { FaAppStore } from 'react-icons/fa';
import { SidePage } from '@client/molecules/sidePage';
import Settings from '@client/modules/settings';
import classNames from 'classnames';
import { useStoreUpdate } from '@client/models/noteModel';
import { useRoutes } from 'react-router-dom';
import routeConfig from '@client/routeConfig';
import Confirm from '@client/components/confirm';
import { ConfirmContext } from '@client/components/confirm/context';
import useConfirmContext from '@client/components/confirm/useConfirmContext';

function App() {
    const messageContextValue = useMessageContext();
    const {
        options: confirmOptions,
        showConfirm,
        onClose: onConfirmClose,
    } = useConfirmContext();
    const [settingsVisible, setSettingsVisible] = useState(false);

    const storeTools = useStoreUpdate();

    const routes = useRoutes(routeConfig);

    return (
        <MessageContext.Provider value={messageContextValue}>
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
                            <FaAppStore
                                title='模板商店'
                                className={classNames('app_operate', {
                                    active: storeTools.loading,
                                })}
                                onClick={() => storeTools.refreshStore()}
                            />
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
