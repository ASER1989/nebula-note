import './index.styl';
import React from 'react';

type Props = {
    children: React.ReactNode;
    labelWidth?: string;
    ['data-test-id']?: string;
};

export const Form = ({ children, labelWidth, 'data-test-id': dataTestId }: Props) => {
    const styleVariables = {
        '--form-label-width': labelWidth ?? 'auto',
    } as React.CSSProperties;

    return (
        <div className='form' style={styleVariables} data-test-id={dataTestId}>
            {children}
        </div>
    );
};

export default Form;
