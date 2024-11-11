import React, { useState, useMemo } from 'react';
import './index.styl';
import BuildForm from '../buildForm';
import { GraphqlQueryName, CustomerTemplate, FieldsOrder } from '../buildForm/formItems';
import type { ExtraState, FormState } from '../buildForm/types';
import { getFieldFlatArrayHighPerformance } from '@client/models/graphql';
import request from '@client/utils/request';
import useMessage from '@client/components/message/useMessage';
import CodeEditor from '@client/components/codeEditor';
import { useRedux } from '@client/store/hooks/useRedux';
import { StateName as BuildResultStateName } from '@client/modules/_shared/template/buildReuslt/constants';
import { BuildResultState } from '@client/modules/_shared/template/buildReuslt/types';
import { buildTemplateWithFormData } from '@client/models/template/api';

export default function SliceShop() {
    const { showMessage } = useMessage();
    const [isLoading, setIsLoading] = useState(false);
    const [respData, setRespData] = useState<unknown>();
    const [, setBuildResult] = useRedux(BuildResultStateName, {} as BuildResultState);

    const handelSubmit = (formState: FormState, extraState: ExtraState) => {
        setIsLoading(true);
        const schemaFields = getFieldFlatArrayHighPerformance(extraState.schema);
        const schemaList = schemaFields.filter((item) => item?.isChecked);
        const template = extraState.customerTemplate?.content;

        buildTemplateWithFormData({ formState, schemaList, template })
            .then((resp) => {
                setBuildResult({ content: resp.data, visible: true });
            })
            .catch((ex: string) => showMessage(ex))
            .finally(() => {
                setTimeout(() => setIsLoading(false), 600);
            });
    };

    return (
        <BuildForm
            onSubmit={handelSubmit}
            isSubmitDisabled={isLoading}
            submitText={isLoading ? '莫急，正在提交...' : '提交'}
        >
            <GraphqlQueryName />
            <CustomerTemplate />
            <FieldsOrder showSchemaMatched />
        </BuildForm>
    );
}
