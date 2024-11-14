import React, { useContext } from 'react';
import '../index.styl';
import { ListItem } from './item';
import { TemplateRecord } from '@client/models/template/types';
import { actions, SliceType } from '@client/modules/snippetList/storeSlice';
import * as templateApi from '@client/models/template/api';
import { ConfirmContext } from '@client/components/confirm/context';
import { useRedux } from '@client/store/hooks/useRedux';
import { StateName as BuildResultStateName } from '@client/modules/_shared/template/buildReuslt/constants';
import { BuildResultState } from '@client/modules/_shared/template/buildReuslt/types';
import useMessage from '@client/components/message/useMessage';
import { useDispatch } from 'react-redux';

type Props = {
    state: SliceType;
    templateList: Array<TemplateRecord>;
    onSave?: () => void;
};
export const List = ({ state, templateList, onSave }: Props) => {
    const dispatch = useDispatch();
    const [, setBuildResult] = useRedux(BuildResultStateName, {} as BuildResultState);
    const { showConfirm } = useContext(ConfirmContext);
    const { showMessage } = useMessage();

    const changeSelectedItem = (templateConfig: TemplateRecord) => {
        dispatch(actions.setTemplateFilePath(templateConfig));
        templateApi
            .getTemplateDocument(templateConfig.filePath as string)
            .then((resp) => {
                dispatch(actions.setTemplateDocument(resp.data));
            });

        templateApi.getTemplateMeta(templateConfig.filePath as string).then((resp) => {
            dispatch(actions.setTemplateMeta(resp.data ?? '{}'));
        });

        templateConfig.snippetList?.forEach((snippet) => {
            templateApi
                .getTemplateContent(templateConfig.filePath, snippet.title)
                .then((resp) => {
                    const newSnippet = {
                        ...snippet,
                        content: resp.data,
                    };
                    dispatch(actions.setSnippetContent(newSnippet));
                });
        });
    };

    const handleClick = (templateConfig: TemplateRecord) => {
        if (state?.template?.filePath === templateConfig.filePath) {
            return;
        }
        if (state?.template?.editStatus === 'Edited') {
            return showConfirm({
                content: '当前模板尚未保存，是否保存？',
                confirmText: '保存',
                cancelText: '不保存',
                callback: (confirm) => {
                    if (confirm) {
                        return onSave?.();
                    }
                    changeSelectedItem(templateConfig);
                },
            });
        }
        changeSelectedItem(templateConfig);
    };

    const handleRunBuild = () => {
        templateApi
            .buildTemplate(state?.template)
            .then((resp) => {
                setBuildResult({
                    content: resp.data,
                    visible: true,
                });
            })
            .catch((ex) => {
                showMessage(ex.toString());
            });
    };

    return (
        <div className='snippet-list'>
            {templateList.map((template) => {
                return (
                    <ListItem
                        isChecked={template.filePath === state?.template.filePath}
                        key={template.name}
                        name={template.name as string}
                        onClick={() => handleClick(template)}
                        onBuild={handleRunBuild}
                    />
                );
            })}
        </div>
    );
};
