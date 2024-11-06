import React, {useContext} from 'react';
import './index.styl';
import {ListItem} from "./item";
import {TemplateConfig} from "@client/models/template/types";
import {useReduxSlice} from "@client/store/hooks/useReduxSlice";
import {
  reducer,
  sliceName,
  setTemplateAction,
  setTemplateContentAction,
  setTemplateMetaAction
} from "@client/modules/snippetList/storeSlice";
import * as templateApi from "@client/models/template/api";
import {ConfirmContext} from "@client/components/confirm/context";
import {useRedux} from "@client/store/hooks/useRedux";
import {StateName as BuildResultStateName} from '@client/modules/_shared/template/buildReuslt/constants';
import {BuildResultState} from '@client/modules/_shared/template/buildReuslt/types';
import useMessage from "@client/atoms/message/useMessage";


type Props = {
  templateList: Array<TemplateConfig>
}
export const List = ({templateList}: Props) => {

  const [state, dispatch] = useReduxSlice({key: sliceName, reducer});
  const [, setBuildResult] = useRedux(BuildResultStateName, {} as BuildResultState)
  const {showConfirm} = useContext(ConfirmContext);
  const {showMessage} = useMessage();

  const changeSelectedItem = (templateConfig: TemplateConfig) => {
    dispatch(setTemplateAction(templateConfig));
    templateApi
      .getTemplateContent(templateConfig.filePath as string)
      .then(
        resp => {
          dispatch(setTemplateContentAction(resp.data));
        }
      );

    templateApi.getTemplateMeta(templateConfig.filePath as string)
      .then(resp => {
        dispatch(setTemplateMetaAction(resp.data ?? '{}'));
      });
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

  const handleRunBuild = () => {
    templateApi.buildTemplate({content: state?.template.content, meta: state?.template.meta})
      .then(resp => {
        setBuildResult({content: resp.data, visible: true});
      })
      .catch(ex => {
        showMessage(ex.toString())
      })
  }

  return (
    <div className='snippet-list'>
      {
        templateList.map(template => {
          return <ListItem isChecked={template.filePath === state?.template.filePath}
                           key={template.name}
                           name={template.name as string}
                           onClick={() => handleClick(template)}
                           onBuild={handleRunBuild}/>
        })
      }
    </div>
  )
}
