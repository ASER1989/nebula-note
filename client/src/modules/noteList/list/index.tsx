import React, { useContext } from 'react';
import '../index.styl';
import { ListItem } from './item';
import { NoteRecord } from '@client/models/noteModel/types';
import { SliceType } from '@client/modules/noteList/storeSlice';
import * as noteApi from '@client/models/noteModel/api';
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
import { changeSelectedItem } from '@client/modules/noteList/asyncThunks';
import { useNoteConfig } from '@client/models/noteModel';

type Props = {
    state: SliceType;
    onSave?: () => void;
};
export const List = ({ state, onSave }: Props) => {
    const dispatch = useDispatch();
    const { templateConfig, reloadTemplateConfig } = useNoteConfig();
    const [, setBuildResult] = useRedux<BuildResultState>(BuildResultStateName, {
        visible: false,
        codeList: [],
    });

    const { showConfirm } = useContext(ConfirmContext);

    const handleChangeSelectedItem = (templateConfig: NoteRecord) => {
        // FIXME: dispatch type
        dispatch(changeSelectedItem(templateConfig) as never);
    };

    const handleClick = (templateConfig: NoteRecord) => {
        if (state?.note?.filePath === templateConfig.filePath) {
            return;
        }
        if (state?.note?.editStatus === 'Edited') {
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
        const { meta, templateList, filePath } = state.note;

        const codeList: Array<CodeSnippet> = await Promise.all(
          templateList?.map(async (template) => {
                try {
                    const resp = await noteApi.buildTemplate({
                        meta,
                        content: template.content ?? '',
                        filePath,
                    });
                    return {
                        title: template.title,
                        content: resp.data,
                        language: template.language,
                        status: 'success',
                    };
                } catch (ex) {
                    const content = queryErrorMessage(ex);
                    return {
                        title: template.title,
                        content,
                        status: 'error',
                    };
                }
            }) || [],
        );

        setBuildResult({ codeList, visible: true });
    };

    const handleRemove = () => {
        showConfirm({
            title: '提示',
            content: '确定要删除该记录及相关文档内容吗？',
            confirmText: '删除',
            cancelText: '取消',
            callback: async (confirm) => {
                if (confirm) {
                    const result = await noteApi.noteRemove(state.note.name);
                    if (result.success) {
                        await reloadTemplateConfig();
                    }
                }
            },
        });
    };

    return (
        <Stack direction='vertical'>
            <StackItem>
                <Header></Header>
            </StackItem>
            <StackItem flex style={{ overflowY: 'auto' }}>
                <div className='note-list'>
                    {templateConfig.map((note) => {
                        return (
                            <ListItem
                                isChecked={note.name === state?.note.name}
                                key={note.name}
                                name={note.name as string}
                                onClick={() => handleClick(note)}
                                onBuild={handleRunBuild}
                                onRemove={handleRemove}
                            />
                        );
                    })}
                </div>
            </StackItem>
        </Stack>
    );
};
