import '../../index.styl';
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Stack, StackItem } from '@nebula-note/ui';
import { Section } from '@nebula-note/ui';
import { MdOutlineDragIndicator } from 'react-icons/md';
import classNames from 'classnames';

type Props = {
    boxSize: { width: string };
    children: React.ReactNode;
    id: string;
    isChecked: boolean;
};

export const DragBox = ({ boxSize, children, id,isChecked }: Props) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
        useSortable({ id });
    
    const classname = classNames({checked:isChecked},"note-list-drag_box");

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <Section
            className={classname}
            style={{
                width: boxSize.width,
                ...style,
            }}
            padding='0'
        >
            <Stack align='center'>
                <StackItem flex>{children}</StackItem>
                <StackItem>
                    <div
                        ref={setNodeRef}
                        {...attributes}
                        {...listeners}
                        className='drag-handle'
                        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                    >
                        <MdOutlineDragIndicator />
                    </div>
                </StackItem>
            </Stack>
        </Section>
    );
};
