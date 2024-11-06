import React, {useContext, useEffect, useMemo} from 'react';
import './index.styl';
import type {ExtraState, FormState} from '../../types';
import {FormItem} from '@client/components/form';
import {BuildFormContext} from '../../context';
import Dropdown, {DropdownOption} from "@client/atoms/dropdown";
import request from '@client/utils/request';
import useMessage from '@client/atoms/message/useMessage';
import Expander from "./expander";
import {useTemplateConfig} from "@client/models/template";
import {TemplateConfig} from "@client/models/template/types";

export default function CustomerTemplate() {
  const {setExtraState, setExtraRender} = useContext(BuildFormContext);
  const {templateConfig, reloadTemplateConfig, setTemplateKeyword} = useTemplateConfig();
  const {showMessage} = useMessage();
  const setCustomerTemplate = (customerTemplate: TemplateConfig) => {
    setExtraState?.((ownState) => {
      return {
        ...ownState,
        customerTemplate,
      };
    });
  };

  const options = useMemo(() => {
    return templateConfig.map(item => ({
      value: item.filePath,
      label: item.name,
      keyword: item.keyword
    }))
  }, [templateConfig])

  useEffect(() => {
    reloadTemplateConfig();
  }, []);


  const expandRender = ({customerTemplate}: ExtraState) => {
    return (
      <Expander templateOption={customerTemplate ?? {}} onChange={setCustomerTemplate}/>
    );
  };

  const handleTemplateTypeChange = (option: DropdownOption) => {
    request.get<string>('/template/content', {path: option.value})
      .then((resp) => {
        if (!resp.success) {
          return showMessage(
            resp.error?.toString() ?? '发生未知错误，Schema拉取失败！',
          );
        }
        setCustomerTemplate({name: option.label, filePath: option.value, content: resp.data});
      });
  }

  const handleCustomerTemplateFocus = () => {
    setExtraRender('customerTemplateExtra', expandRender);
  };

  const handleSearch = (keyword: string | undefined) => {
    setTemplateKeyword(keyword)
  }

  const tagColors = [
    {
      tag: '[acro]',
      color: '#2c92ff'
    },
    {
      tag: '[table]',
      color: '#c1455b'
    },
    {
      tag: '[graphql]',
      color: '#02c9c2'
    }
    ,
    {
      tag: '[enum]',
      color: '#e58304'
    }
  ];

  return (
    <FormItem label='数据模板'>
      <Dropdown
        options={options as Array<DropdownOption>}
        placeholder='选择一个代码模板，可以编辑它，不建议编辑后再切换数据模板'
        onFocus={handleCustomerTemplateFocus}
        onChange={handleTemplateTypeChange}
        enableTags={tagColors}
        onSearch={handleSearch}
      ></Dropdown>
    </FormItem>
  );
}
