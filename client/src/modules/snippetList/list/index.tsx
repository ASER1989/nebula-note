import React, { useContext } from 'react';
import '../index.styl';
import { ListItem } from './item';
import { TemplateRecord } from '@client/models/template/types';
import { SliceType } from '@client/modules/snippetList/storeSlice';
import * as templateApi from '@client/models/template/api';
import { ConfirmContext } from '@client/components/confirm/context';
import { useRedux } from '@client/store/hooks/useRedux';
import { StateName as BuildResultStateName } from '@client/modules/_shared/template/buildReuslt/constants';
import {
    BuildResultState,
    CodeSnippet,
} from '@client/modules/_shared/template/buildReuslt/types';
import { useDispatch } from 'react-redux';
import { Stack, StackItem } from '@client/molecules/stack';
import { Header } from './header';
import { queryErrorMessage } from '@client/utils/queries';
import { changeSelectedItem } from '@client/modules/snippetList/asyncThunks';

type Props = {
    state: SliceType;
    templateList: Array<TemplateRecord>;
    onSave?: () => void;
};
export const List = ({ state, templateList, onSave }: Props) => {
    const dispatch = useDispatch();
    const [, setBuildResult] = useRedux<BuildResultState>(BuildResultStateName, {
        visible: false,
        codeList: [],
    });

    const { showConfirm } = useContext(ConfirmContext);

    const handleChangeSelectedItem = (templateConfig: TemplateRecord) => {
        // TODO: Fix dispatch type
        dispatch(changeSelectedItem(templateConfig) as never);
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
                    handleChangeSelectedItem(templateConfig);
                },
            });
        }
        handleChangeSelectedItem(templateConfig);
    };

    const handleRunBuild = async () => {
        const { meta, snippetList, filePath } = state.template;

        const codeList: Array<CodeSnippet> = await Promise.all(
            snippetList?.map(async (snippet) => {
                try {
                    const resp = await templateApi.buildTemplate({
                        meta,
                        content: snippet.content ?? '',
                        filePath,
                    });
                    return {
                        title: snippet.title,
                        content: resp.data,
                        language: snippet.language,
                        status: 'success',
                    };
                } catch (ex) {
                    const content = queryErrorMessage(ex);
                    return {
                        title: snippet.title,
                        content,
                        status: 'error',
                    };
                }
            }) || [],
        );

        setBuildResult({ codeList, visible: true });
    };

    return (
        <Stack direction='vertical'>
            <StackItem>
                <Header></Header>
            </StackItem>
            <StackItem flex style={{ overflowY: 'auto' }}>
                <div className='snippet-list'>
                    {templateList.map((template) => {
                        return (
                            <ListItem
                                isChecked={template.name === state?.template.name}
                                key={template.name}
                                name={template.name as string}
                                onClick={() => handleClick(template)}
                                onBuild={handleRunBuild}
                            />
                        );
                    })}
                </div>
            </StackItem>
        </Stack>
    );
};
