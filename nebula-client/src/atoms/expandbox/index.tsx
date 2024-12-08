import './index.styl';
import React from 'react';
import classNames from 'classnames';

export type Props = {
    value?: boolean;
    label?: string;
    onChange?: (value: boolean) => void;
    ['data-test-id']?: string;
};

export default function ExpandBox({ value, label, onChange,'data-test-id': dataTestId }: Props) {
    const handleChange = () => {
        onChange?.(!value);
    };

    return (
        <div className='expandbox' onClick={handleChange} data-test-id={dataTestId}>
            <div className={classNames('expand-box', { expanded: value })}></div>
            {label && <span className='expand-label'>{label}</span>}
        </div>
    );
}
