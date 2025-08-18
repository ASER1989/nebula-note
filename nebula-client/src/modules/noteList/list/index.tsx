import '../index.styl';
import React, { useContext, useEffect } from 'react';
import { ConfirmContext } from '@client/components/confirmBox';
import { useLocalization } from '@client/localizations/useLocalization';
import { useNoteConfig } from '@client/models/noteModel';
import * as noteApi from '@client/models/noteModel/api';
import { NoteRecord } from '@client/models/noteModel/types';
import { usePermissions } from '@client/models/permissions/usePermissions';
import { StateName as BuildResultStateName } from '@client/modules/noteList/buildReuslt/constants';
import {
    BuildResultState,
    CodeSnippet,
} from '@client/modules/noteList/buildReuslt/types';
import useNote, { NoteState } from '@client/modules/noteList/useNote';
import useNoteController from '@client/modules/noteList/useNoteController';
import { useRedux } from '@client/store/hooks/useRedux';
import { queryErrorMessage } from '@client/utils/queries';
import { useBoxSize } from '@client/utils/useBoxSize';
import {
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    closestCenter,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers';
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Stack, StackItem } from '@nebula-note/ui';
import { useParams } from 'react-router-dom';
import { contentTabIdQuery } from '../queries';
import { Header } from './header';
import { ListItem } from './item';
import { DragBox } from './item/dragBox';

type Props = {
    state: NoteState;
    onSave?: () => void;
};
export const List = ({ state, onSave }: Props) => {
    const { getText } = useLocalization();
    const { boxRef, boxSize } = useBoxSize();
    const actions = useNote();
    const { changeSelectedItem } = useNoteController();
    const { showConfirm } = useContext(ConfirmContext);
    const { noteList, reload, rename, remove, reorder, fetchStatus } = useNoteConfig();
    const { isReadonly } = usePermissions();
    const { setState: setBuildResult } = useRedux<BuildResultState>(
        BuildResultStateName,
        {
            visible: false,
            codeList: [],
        },
    );

    const { navigateNoteName, navigateTabName } = useParams();

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    useEffect(() => {
        if (fetchStatus === 'Success' && navigateNoteName) {
            const targetNote = noteList.find(
                (note) => note.name.toLowerCase() === navigateNoteName.toLowerCase(),
            );
            if (targetNote) {
                handleChangeSelectedItem(targetNote);
            }
            if (navigateTabName) {
                const tabIndex =
                    targetNote?.templateList?.findIndex(
                        (item) => item.title === navigateTabName,
                    ) ?? -1;
                if (tabIndex >= 0) {
                    const tableId = contentTabIdQuery(tabIndex);
                    actions.setActiveProperty(tableId);
                }
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

        if (isReadonly && state?.editStatus === 'Edited') {
            showConfirm({
                content: getText(
                    '当前为预览模式，内容无法保存，如需体验完整功能请下载安装桌面版',
                ),
                confirmText: getText('留在当前页'),
                cancelText: getText('继续'),
                callback: (confirm) => {
                    if (confirm) {
                        return;
                    }
                    handleChangeSelectedItem(noteRecord);
                },
            });
            return;
        }

        if (state?.editStatus === 'Edited') {
            return showConfirm({
                content: getText('当前模板尚未保存，是否保存？'),
                confirmText: getText('保存'),
                cancelText: getText('不保存'),
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
            title: getText('提示'),
            content: getText('确定要删除该记录及相关文档内容吗？'),
            confirmText: getText('删除'),
            cancelText: getText('取消'),
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
            handleChangeSelectedItem(newNoteRecord);
            actions.setActiveProperty(state.activeProperty ?? 'document');
            return true;
        }
        return false;
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            reorder(active.id as string, over.id as string);
        }
    };

    return (
        <Stack direction='vertical'>
            <StackItem>
                <Header></Header>
            </StackItem>
            <StackItem flex style={{ overflowY: 'auto' }}>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                    modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
                >
                    <SortableContext
                        items={noteList.map((item) => ({ ...item, id: item.name }))}
                        strategy={verticalListSortingStrategy}
                    >
                        <div className='note-list' data-test-id='note-list' ref={boxRef}>
                            {noteList.map((note) => {
                                return (
                                    <DragBox
                                        id={note.name}
                                        boxSize={boxSize}
                                        isChecked={note.name === state?.note.name}
                                        key={note.name}
                                    >
                                        <ListItem
                                            isChecked={note.name === state?.note.name}
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
                                    </DragBox>
                                );
                            })}
                        </div>
                    </SortableContext>
                </DndContext>
            </StackItem>
        </Stack>
    );
};
