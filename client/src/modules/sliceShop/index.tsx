import React, {useState, useMemo} from 'react';
import './index.styl';
import BuildForm from '../buildForm';
import {GraphqlQueryName, CustomerTemplate, FieldsOrder} from '../buildForm/formItems';
import type {ExtraState, FormState} from '../buildForm/types';
import {getFieldFlatArrayHighPerformance} from '@client/models/graphql';
import request from '@client/utils/request';
import useMessage from '@client/atoms/message/useMessage';
import CodeEditor from "@client/components/codeEditor";

export default function SliceShop() {
    const {showMessage} = useMessage();
    const [isLoading, setIsLoading] = useState(false);
    const [respData, setRespData] = useState<unknown>();

    const handelSubmit = (formState: FormState, extraState: ExtraState) => {
        setIsLoading(true);
        const schemaFields = getFieldFlatArrayHighPerformance(extraState.schema);
        const schemaList = schemaFields.filter((item) => item?.isChecked);
        const template = extraState.customerTemplate?.template;

        request
            .post('/slice/code', {formState, schemaList, template})
            .then((resp) => {
                if (resp.success) {
                    setRespData(resp.data);
                    return showMessage('生成成功！一路顺风！');
                }
                showMessage(resp.error.toString());
            })
            .finally(() => {
                setTimeout(() => setIsLoading(false), 600);
            });
    };

    const resultCode = useMemo(() => {
        return (
            <CodeEditor value={respData?.toString()} title='Code' showExpand/>
        )
    }, [respData]);


    return (
        <BuildForm
            onSubmit={handelSubmit}
            isSubmitDisabled={isLoading}
            submitText={isLoading ? '莫急，正在提交...' : '提交'}
            footer={resultCode}
        >
            <GraphqlQueryName/>
            <CustomerTemplate/>
            <FieldsOrder showSchemaMatched/>
        </BuildForm>
    );
}
