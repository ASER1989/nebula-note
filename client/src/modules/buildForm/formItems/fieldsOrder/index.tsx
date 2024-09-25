import React, {useContext, useEffect, useMemo, useState} from 'react';
import './index.styl';
import {FormItem} from '@client/components/form';
import {BuildFormContext} from '@client/modules/buildForm/context';
import {ExtraState} from "@client/modules/buildForm/types";
import Textarea from "@client/atoms/textarea";
import {getFieldFlatArrayHighPerformance} from "@client/models/graphql";
import FieldsOrderExpander from "@client/modules/buildForm/formItems/fieldsOrder/expander";
import {GrCodepen, GrCode} from "react-icons/gr";
import _ from 'lodash';

type Props = {
    showSchemaMatched?: boolean
}

export default function FieldsOrder({showSchemaMatched}: Props) {
    const {formState, extraState, setFormState, setExtraRender} = useContext(BuildFormContext);
    const [viewMode, setViewMode] = useState('edit');

    const schemaList = useMemo(() => {
        if (!showSchemaMatched || viewMode === 'edit') {
            return [];
        }
        return getFieldFlatArrayHighPerformance(extraState?.schema);

    }, [showSchemaMatched, extraState?.schema]);

    const handleTableColumnOrdersFocus = () => {
        setExtraRender('columnSortNames', expandRender);
    };

    const handleChange = (val: string) => {
        setFormState?.((ownState) => ({...ownState, columnSortNames: val}));
    };

    const expandRender = (extraState: ExtraState) => {
        return (
            <div className='none_tip' key={extraState?.resizeTimestamp}>
                <p>1、按顺序输入列名，用空格或者逗号分割；</p>
                <p>2、输出结果会根据列名顺序进行排列；</p>
                <p>3、注意schema中的列名应与排序列名一致；</p>
                <br/>
                <FieldsOrderExpander schemaList={schemaList} title='字段预览'/>
            </div>
        );
    };

    const handleViewChange = (type: 'preview' | 'edit') => {
        setViewMode(type);
    }


    return (
        <FormItem label='字段排序'>
            <div className='fields-orders-content-box'>
                {
                    viewMode === 'edit' &&
                    <Textarea
                        placeholder='按顺序输入列名，用空格或者逗号分割'
                        onFocus={handleTableColumnOrdersFocus}
                        onChange={handleChange}
                        value={formState?.columnSortNames}
                        resize='vertical'
                    />
                }
                {
                    viewMode === 'preview' &&
                    <FieldsOrderExpander schemaList={schemaList}/>
                }

                <div className='switch-group'>
                    {
                        viewMode === 'edit' &&
                        <GrCodepen className='switch-case preview' onClick={() => handleViewChange('preview')}/>
                    }
                    {
                        viewMode === 'preview' &&
                        <GrCode className='switch-case edit' onClick={() => handleViewChange('edit')}/>
                    }
                </div>
            </div>
        </FormItem>
    );
}
