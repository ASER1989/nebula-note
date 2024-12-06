import './index.styl';
import React from 'react';

type Props = {
    children: React.ReactNode;
    labelWidth?: string;
};

export const Form = ({ children, labelWidth }: Props) => {
    const styleVariables = {
        '--form-label-width': labelWidth ?? 'auto',
    } as React.CSSProperties;

    return (
        <div className='form' style={styleVariables}>
            {children}
        </div>
    );
};

export default Form;
