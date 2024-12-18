import './index.styl';
import React from 'react';
import classNames from 'classnames';

export type CheckboxProps = {
    value?: boolean;
    label?: string;
    onChange?: (value: boolean) => void;
    ['data-test-id']?: string;
};

export const Checkbox = ({
    value,
    label,
    onChange,
    'data-test-id': dataTestId,
}: CheckboxProps) => {
    const handleChange = () => {
        onChange?.(!value);
    };

    return (
        <div className='nebula-checkbox' onClick={handleChange}>
            <div
                className={classNames('check-box', { checked: value })}
                data-test-id={dataTestId}
            ></div>
            {label && <span className='check-label'>{label}</span>}
        </div>
    );
};

export default Checkbox;
