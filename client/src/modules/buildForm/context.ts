import React from 'react';
import type {FormState, ExtraState, ExtraRender} from '@client/modules/buildForm/types';
import _ from 'lodash';

export type Props = {
    formState?: FormState;
    setFormState: React.Dispatch<React.SetStateAction<FormState>>;
    extraState?: ExtraState;
    setExtraState: React.Dispatch<React.SetStateAction<ExtraState>>;
    setExtraRender: (name: string, render: ExtraRender) => void;
    extraName?: string;
};

const defaultContext: Props = {
    formState: {},
    setFormState: _.noop,
    extraState: {},
    setExtraState: _.noop,
    setExtraRender: _.noop,
};
export const BuildFormContext = React.createContext<Props>(defaultContext);
