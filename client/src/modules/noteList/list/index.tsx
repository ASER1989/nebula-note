import React, { useContext } from 'react';
import '../index.styl';
import { ListItem } from './item';
import { NoteRecord } from '@client/models/noteModel/types';
import { SliceType } from '@client/modules/noteList/storeSlice';
import * as noteApi from '@client/models/noteModel/api';
import { ConfirmContext } from '@client/components/confirm/context';
import { useRedux } from '@client/store/hooks/useRedux';
import { StateName as BuildResultStateName } from '@client/modules/noteList/buildReuslt/constants';
import {
    BuildResultState,
    CodeSnippet,
} from '@client/modules/noteList/buildReuslt/types';
import { useDispatch } from 'react-redux';
import { Stack, StackItem } from '@client/molecules/stack';
import { Header } from './header';
import { queryErrorMessage } from '@client/utils/queries';
import { changeSelectedItem } from '@client/modules/noteList/asyncThunks';
import { useNoteConfig } from '@client/models/noteModel';
import { actions } from '@client/modules/noteList/storeSlice';

type Props = {
    state: SliceType;
    onSave?: () => void;
};
export const List = ({ state, onSave }: Props) => {
    const dispatch = useDispatch();
    const { noteList, reload, rename, remove } = useNoteConfig();
    const { setState: setBuildResult } = useRedux<BuildResultState>(
        BuildResultStateName,
        {
            visible: false,
            codeList: [],
        },
    );

    const { showConfirm } = useContext(ConfirmContext);

    const handleChangeSelectedItem = (noteRecord: NoteRecord) => {
        // FIXME: dispatch type
        dispatch(changeSelectedItem(noteRecord) as never);
    };

    const handleClick = (noteRecord: NoteRecord) => {
        if (state?.note?.filePath === noteRecord.filePath) {
            return;
        }
        if (state?.editStatus === 'Edited') {
            return showConfirm({
                content: '当前模板尚未保存，是否保存？',
                confirmText: '保存',
                cancelText: '不保存',
                callback: (confirm) => {
                    if (confirm) {
                        return onSave?.();
                    }
                    handleChangeSelectedItem(noteRecord);
                },
            });
        }
        handleChangeSelectedItem(noteRecord);
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
                    const index = noteList.findIndex(
                        (item) => item.name === state.note.name,
                    );
                    const nextNote = noteList[index + 1] || noteList[index - 1];
                    const result = await remove(state.note.name);
                    if (result.success) {
                        handleChangeSelectedItem(nextNote);
                    }
                }
            },
        });
    };

    const handleRename = async (name: string, newName: string) => {
        const newNoteRecord = await rename(name, newName);
        if (newNoteRecord) {
            await reload();
            dispatch(actions.updateNote(newNoteRecord));
            return true;
        }
        return false;
    };

    return (
        <Stack direction='vertical'>
            <StackItem>
                <Header></Header>
            </StackItem>
            <StackItem flex style={{ overflowY: 'auto' }}>
                <div className='note-list'>
                    {noteList.map((note) => {
                        return (
                            <ListItem
                                isChecked={note.name === state?.note.name}
                                key={note.name}
                                name={note.name as string}
                                onClick={() => handleClick(note)}
                                onBuild={
                                    (note.templateList?.length ?? 0 > 0)
                                        ? handleRunBuild
                                        : undefined
                                }
                                onRemove={handleRemove}
                                onRename={handleRename}
                            />
                        );
                    })}
                </div>
            </StackItem>
        </Stack>
    );
};
