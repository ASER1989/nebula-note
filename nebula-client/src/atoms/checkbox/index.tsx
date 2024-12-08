import './index.styl';
import React from 'react';
import classNames from 'classnames';

export type Props = {
    value?: boolean;
    label?: string;
    onChange?: (value: boolean) => void;
    ['data-test-id']?: string;
};

export default function Checkbox({ value, label, onChange,'data-test-id': dataTestId }: Props) {
    const handleChange = () => {
        onChange?.(!value);
    };

    return (
        <div className='checkbox' onClick={handleChange}>
            <div className={classNames('check-box', { checked: value })} data-test-id={dataTestId}></div>
            {label && <span className='check-label'>{label}</span>}
        </div>
    );
}
