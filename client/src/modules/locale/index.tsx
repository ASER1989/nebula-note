import React, {useState} from 'react';
import './index.styl';
import BuildForm from '../buildForm';
import {ModuleName, GraphqlTypeName, FolderName} from '../buildForm/formItems';
import type {ExtraState, FormState} from '../buildForm/types';
import {getFieldFlatArrayHighPerformance} from '@client/models/graphql';
import request from '@client/utils/request';
import useMessage from '@client/atoms/message/useMessage';

export default function Locale() {
    const {showMessage} = useMessage();
    const [isLoading, setIsLoading] = useState(false);
    const handelSubmit = (formState: FormState, extraState: ExtraState) => {
        setIsLoading(true);
        const schemaFields = getFieldFlatArrayHighPerformance(extraState.schema);
        const schemaList = schemaFields.filter((item) => item?.isChecked);
        request
            .post('/locale/in', {formState, schemaList})
            .then((resp) => {
                if (resp.success) {
                    return showMessage('生成成功！一路顺风！');
                }
                showMessage(resp.error.toString());
            })
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
            <ModuleName/>
            <GraphqlTypeName/>
            <FolderName/>

            <br/>
            <div
                style={{
                    border: 'solid 1px #e0e0e0',
                    textAlign: 'left',
                    height: 200,
                    padding: 20,
                }}
            >
                <div
                    style={{
                        borderBottom: 'solid 1px #e0e0e0',
                        textAlign: 'left',
                        marginBottom: 20,
                    }}
                >
                    测试类型：
                </div>
                <p> AccountingVoucher</p>
                <p> RiskWarnDTO [Bug]</p>
                <div
                    style={{
                        borderBottom: 'solid 1px #e0e0e0',
                        textAlign: 'left',
                        marginBottom: 20,
                    }}
                >
                    调试日志：
                </div>

            </div>
        </BuildForm>
    );
}
