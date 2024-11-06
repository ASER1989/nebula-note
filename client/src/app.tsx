import React, {useState} from 'react';
import './app.styl';
import Menu, {MenuConfigObject} from './atoms/menu';
import {MessageContext} from '@client/atoms/message/context';
import Message from '@client/atoms/message';
import packageConfig from '../../package.json';
import {LuSettings,LuFileCode} from 'react-icons/lu';
import {FaAppStore} from 'react-icons/fa';
import {SidePage} from "@client/components/sidePage";
import Settings from "@client/modules/settings";
import classNames from 'classnames';
import {useStoreUpdate} from "@client/models/template";
import Performance from "@client/modules/tools/performance";
import {useRoutes, useNavigate} from "react-router-dom";
import routeConfig from "@client/routeConfig";
import Confirm from "@client/components/confirm";
import {ConfirmContext} from "@client/components/confirm/context";
import useConfirmContext from "@client/components/confirm/useConfirmContext";

function App() {
  const [messageContent, setMessageContent] = useState<string | null>(null);
  const {content: confirmContent, showConfirm, onClose: onConfirmClose} = useConfirmContext();
  const [settingsVisible, setSettingsVisible] = useState(false);

  const [selectedMenu, setSelectedMenu] = useState<string>('sliceShop');
  const storeTools = useStoreUpdate();
  const navigate = useNavigate();

  const handleMenuChange = (path: string) => {
    setSelectedMenu(path);
    navigate(path);
  }

  const routes = useRoutes(routeConfig);

  return (
    <MessageContext.Provider value={{content: messageContent, setContent: setMessageContent}}>
      <ConfirmContext.Provider value={{content: confirmContent, showConfirm, onClose: onConfirmClose}}>
        <div className='app_layout'>
          <div className='app_layout_header'>
            <div className='logo'>Nebula</div>
            <Menu checkedKey={selectedMenu} onChange={handleMenuChange}
                  menuConfig={routeConfig as Array<MenuConfigObject>}/>
          </div>
          <div className='app_layout_content'>
            {routes}
            <SidePage visible={settingsVisible} onVisibleChange={() => setSettingsVisible(false)}>
              <Settings/>
            </SidePage>
          </div>
          <div className='app_layout_footer'>
            <div className='app_layout_footer_copyright'>
              <div>v{packageConfig.version}</div>
              <Performance/>
            </div>
            <div className='app_layout_footer_operation'>
              <LuFileCode title='代码'  className='app_operate filecode'/>
              <FaAppStore
                title='模板商店'
                className={classNames('app_operate', {active: storeTools.loading})}
                onClick={() => storeTools.refreshStore()}
              />
              <LuSettings title='设置' className={classNames('app_operate', {active: settingsVisible})}
                          onClick={() => setSettingsVisible(true)}/>
            </div>
          </div>
          <Message content={messageContent}/>
          <Confirm/>
        </div>
      </ConfirmContext.Provider>
    </MessageContext.Provider>
  );
}

export default App;
