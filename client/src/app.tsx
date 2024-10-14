import React, {useState} from 'react';
import './app.styl';
import Menu, {MenuConfigObject} from './atoms/menu';
import {MessageContext} from '@client/atoms/message/context';
import Message from '@client/atoms/message';
import packageConfig from '../../package.json';
import {LuSettings} from 'react-icons/lu';
import {FaAppStore} from 'react-icons/fa';
import {SidePage} from "@client/components/sidePage";
import Settings from "@client/modules/settings";
import classNames from 'classnames';
import {useStoreUpdate} from "@client/models/templateStore";
import Performance from "@client/modules/tools/performance";
import {useRoutes, useNavigate} from "react-router-dom";
import routeConfig from "@client/routeConfig";

function App() {
  const [messageContent, setMessageContent] = useState<string | null>(null);
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
            <div title='版权所有，盗版必究'>©2023 Nova</div>
            <div>v{packageConfig.version}</div>
            <Performance/>
          </div>
          <div className='app_layout_footer_operation'>
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
      </div>
    </MessageContext.Provider>
  );
}

export default App;
