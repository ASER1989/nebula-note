import './index.styl';
import React from 'react';

type FormItemProps = {
    label?: string;
    children: JSX.Element | React.ReactElement;
    alignItems?: React.CSSProperties['alignItems'];
    ['data-test-id']?: string;
};

export const FormItem = ({
    label,
    alignItems,
    children,
    'data-test-id': dataTestId,
}: FormItemProps) => {
    if (!label) {
        return (
            <div className='form-item form-item-only'>
                <div className='form-item-content form-item-center'>{children}</div>
            </div>
        );
    }

    return (
        <div className='form-item' style={{ alignItems }} data-test-id={dataTestId}>
            <div className='form-item-label'>{label}</div>
            <div className='form-item-content'>{children}</div>
        </div>
    );
};

export default FormItem;
