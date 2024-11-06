import React, {useContext} from 'react';
import './index.styl';
import {ListItem} from "./item";
import {TemplateConfig} from "@client/models/template/types";
import {useStore} from "@client/utils/hooks/useStore";
import {
  reducer,
  sliceName,
  setTemplateAction,
  setTemplateContentAction,
  setTemplateMetaAction
} from "@client/modules/snippetList/storeSlice";
import * as templateApi from "@client/models/template/api";
import {ConfirmContext} from "@client/components/confirm/context";

type Props = {
  templateList: Array<TemplateConfig>
}
export const List = ({templateList}: Props) => {

  const [state, dispatch] = useStore({key: sliceName, reducer});
  const {showConfirm} = useContext(ConfirmContext);

  const changeSelectedItem = (templateConfig: TemplateConfig) => {
    dispatch(setTemplateAction(templateConfig));
    templateApi
      .getTemplateContent(templateConfig.filePath as string)
      .then(
        resp => {
          if (resp?.success) {
            dispatch(setTemplateContentAction(resp.data));
          }
        }
      )

    templateApi.getTemplateMeta(templateConfig.filePath as string)
      .then(resp=>{
        if(resp.success){
          dispatch(setTemplateMetaAction(resp.data));
        }
      })
  }

  const handleClick = (templateConfig: TemplateConfig) => {
    if (state?.template?.filePath === templateConfig.filePath) {
      return;
    }
    if (state?.template?.editStatus === 'Edited') {
      return showConfirm('当前模板尚未保存，是否放弃保存？', (confirm) => {
        if (confirm) {
          changeSelectedItem(templateConfig);
        }
      })
    }
    changeSelectedItem(templateConfig);
  }

  return (
    <div className='snippet-list'>
      {
        templateList.map(template => {
          return <ListItem isChecked={template.filePath === state?.template.filePath}
                           key={template.name}
                           name={template.name as string} onClick={() => handleClick(template)}/>
        })
      }
    </div>
  )
}
