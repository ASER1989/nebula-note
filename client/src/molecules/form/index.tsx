import './index.styl';
import React from 'react';

type FormItemProps = {
    label?: string;
    children: JSX.Element | React.ReactElement;
    alignItems?: React.CSSProperties['alignItems'];
};

export function FormItem(props: FormItemProps) {
    if (!props.label) {
        return (
            <div className='form-item form-item-only'>
                <div className='form-item-content form-item-center'>{props.children}</div>
            </div>
        );
    }

    return (
        <div className='form-item' style={{alignItems: props.alignItems}}>
            <div className='form-item-label'>{props.label}</div>
            <div className='form-item-content'>{props.children}</div>
        </div>
    );
}

type Props = {
    children: React.ReactNode;
    labelWidth?: string;
};

export default function Form({ children, labelWidth }: Props) {
    const styleVariables = {
        '--form-label-width': labelWidth ?? 'auto',
    } as any;

    return (
        <div className='form' style={styleVariables}>
            {children}
        </div>
    );
}
