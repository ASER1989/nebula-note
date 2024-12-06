import React, { useContext, useEffect } from 'react';
import '../index.styl';
import { ListItem } from './item';
import { NoteRecord } from '@client/models/noteModel/types';
import * as noteApi from '@client/models/noteModel/api';
import { ConfirmContext } from '@client/components/confirm/context';
import { useRedux } from '@client/store/hooks/useRedux';
import { StateName as BuildResultStateName } from '@client/modules/noteList/buildReuslt/constants';
import {
    BuildResultState,
    CodeSnippet,
} from '@client/modules/noteList/buildReuslt/types';
import { Stack, StackItem } from '@client/molecules/stack';
import { Header } from './header';
import { queryErrorMessage } from '@client/utils/queries';
import useNoteController from '@client/modules/noteList/useNoteController';
import { useNoteConfig } from '@client/models/noteModel';
import { useParams } from 'react-router-dom';
import useNote, { NoteState } from '@client/modules/noteList/useNote';

type Props = {
    state: NoteState;
    onSave?: () => void;
};
export const List = ({ state, onSave }: Props) => {
    const actions = useNote();
    const { changeSelectedItem } = useNoteController();
    const { showConfirm } = useContext(ConfirmContext);
    const { noteList, reload, rename, remove, fetchStatus } = useNoteConfig();
    const { setState: setBuildResult } = useRedux<BuildResultState>(
        BuildResultStateName,
        {
            visible: false,
            codeList: [],
        },
    );

    const { navigateNoteName } = useParams();
    useEffect(() => {
        if (fetchStatus === 'Success' && navigateNoteName) {
            const targetNote = noteList.find(
                (note) => note.name.toLowerCase() === navigateNoteName.toLowerCase(),
            );
            if (targetNote) {
                handleChangeSelectedItem(targetNote);
            }
        }
    }, [fetchStatus]);

    const handleChangeSelectedItem = (noteRecord: NoteRecord) => {
        changeSelectedItem(noteRecord);
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
            actions.updateNote(newNoteRecord);
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
