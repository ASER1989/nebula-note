import React, {useContext} from 'react';
import './index.styl';
import {ListItem} from "./item";
import {TemplateConfig} from "@client/models/template/types";
import {useStore} from "@client/utils/hooks/useStore";
import {reducer, sliceName, setTemplateAction, setTemplateContentAction} from "@client/modules/snippetList/storeSlice";
import {fetchTemplateContent} from "@client/models/apis/templateApi";
import {ConfirmContext} from "@client/components/confirm/context";

type Props = {
  templateList: Array<TemplateConfig>
}
export const List = ({templateList}: Props) => {

  const [state, dispatch] = useStore({key: sliceName, reducer});
  const {showConfirm} = useContext(ConfirmContext);

  const changeSelectedItem = (templateConfig: TemplateConfig) => {
    dispatch(setTemplateAction(templateConfig));
    fetchTemplateContent(templateConfig.filePath).then(resp => {
      if (resp?.success) {
        dispatch(setTemplateContentAction(resp.data));
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
                           name={template.name} onClick={() => handleClick(template)}/>
        })
      }
    </div>
  )
}
