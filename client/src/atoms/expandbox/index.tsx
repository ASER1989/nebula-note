import './index.styl';
import React from 'react';
import classNames from 'classnames';

type Props = {
    value?: boolean;
    label?: string;
    onChange?: (value: boolean) => void;
};

export default function Expandbox({ value, label, onChange }: Props) {
    const handleChange = () => {
        onChange?.(!value);
    };

    return (
        <div className='expandbox' onClick={handleChange}>
            <div className={classNames('expand-box', { expanded: value })}></div>
            {label && <span className='expand-label'>{label}</span>}
        </div>
    );
}
