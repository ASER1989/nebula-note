import React, {useState, useCallback, useRef} from 'react';
import './index.styl';
import Form, {FormItem} from '@client/components/form';
import Button from '@client/atoms/button';
import {BuildFormContext} from './context';
import type {FormState, ExtraState, ExtraRender} from './types';
import ResizableSplit from "@client/components/resizableSplit";

type Props = {
  children: React.ReactNode;
  submitText?: string;
  isSubmitDisabled?: boolean;
  onSubmit: (formState: FormState, extraState: ExtraState) => void;
  footer?: React.ReactNode;
};
export default function BuildForm(
  {
    onSubmit,
    children,
    submitText,
    isSubmitDisabled,
    footer
  }: Props) {
  const [formState, setFormState] = useState<FormState>({});
  const [extraState, setExtraState] = useState<ExtraState>({});
  const [extraName, setExtraName] = useState<string>();
  const extraRenderRef = useRef<ExtraRender>();

  const setExtraRender = (name: string, render: ExtraRender) => {
    extraRenderRef.current = render;
    setExtraName(name);
  };
  const getExtraRender = useCallback(() => {
    if (extraName) {
      return extraRenderRef.current?.(extraState, formState);
    }
    return null;
  }, [extraState, formState, extraName]);

  const handleSubmit = () => {
    onSubmit(formState, extraState);
  };

  return (
    <BuildFormContext.Provider
      value={{formState, setFormState, extraState, setExtraState, setExtraRender, extraName}}
    >
      <div className='build-form'>
        <ResizableSplit>
          <div className='form-container'>
            <div className='form-body'>
              <Form>
                {children}
                <FormItem>
                  <Button
                    onClick={handleSubmit}
                    type='primary'
                    disabeld={isSubmitDisabled}
                  >
                    {submitText ?? '提交'}
                  </Button>
                </FormItem>
              </Form>
            </div>
            <div className='form-footer'>
              {footer}
            </div>
          </div>
          {getExtraRender()}
        </ResizableSplit>
      </div>
    </BuildFormContext.Provider>
  );
}
