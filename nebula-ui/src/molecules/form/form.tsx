import './index.styl';
import React from 'react';

export type FormProps = {
    children: React.ReactNode;
    labelWidth?: string;
    ['data-test-id']?: string;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const Form = ({
    children,
    labelWidth,
    onSubmit,
    'data-test-id': dataTestId,
}: FormProps) => {
    const styleVariables = {
        '--form-label-width': labelWidth ?? 'auto',
    } as React.CSSProperties;
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit?.(e);
    };

    const handleEnter = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <form
            className='nebula-form'
            style={styleVariables}
            data-test-id={dataTestId}
            onSubmit={handleSubmit}
            onKeyDown={handleEnter}
        >
            {children}
        </form>
    );
};

export default Form;
