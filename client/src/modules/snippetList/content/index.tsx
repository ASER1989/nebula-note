import React from "react";
import {Tabs, TabPane} from "@client/components/tabs";
import {SnippetTemplate} from './snippetTemplate';
import {useStore} from "@client/utils/hooks/useStore";
import {reducer, sliceName} from "@client/modules/snippetList/storeSlice";

type Props = {
  config: string;

}

export const Content = ({ config}: Props) => {
  const [state] = useStore({key: sliceName, reducer})

  return (
    <Tabs>
      <TabPane id='code' key='code' title='模板编辑'>
        <SnippetTemplate value={state?.template?.content ?? ''}/>
      </TabPane>
      <TabPane id='config' key='config' title='模板参数配置'>
        <SnippetTemplate value={config}/>
      </TabPane>
    </Tabs>
  );
}
