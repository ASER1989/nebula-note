import './index.styl';
import React from 'react';
import classNames from 'classnames';

export type Props = {
    value?: boolean;
    label?: string;
    onChange?: (value: boolean) => void;
};

export default function Checkbox({ value, label, onChange }: Props) {
    const handleChange = () => {
        onChange?.(!value);
    };

    return (
        <div className='checkbox' onClick={handleChange}>
            <div className={classNames('check-box', { checked: value })}></div>
            {label && <span className='check-label'>{label}</span>}
        </div>
    );
}
