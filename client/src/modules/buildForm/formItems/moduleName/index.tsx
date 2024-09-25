import React, { useContext } from 'react';
import Input from '@client/atoms/input';
import './index.styl';
import { FormItem } from '@client/components/form';
import { BuildFormContext } from '@client/modules/buildForm/context';

export default function ModuleName() {
    const { formState, setFormState, setExtraRender } = useContext(BuildFormContext);
    const expandRender = () => {
        return (
            <div className='none_tip'>
                <p>1、使用项目中的模块名称， 如不存在会新建文件夹并以“模块名称”命名；</p>
                <p>2、使用小驼峰命名规则；</p>
                <p>3、不使用hms作为前缀。</p>
            </div>
        );
    };
    const handleModuleNameFocus = () => {
        setExtraRender('moduleName', expandRender);
    };
    const handleChange = (val: string) => {
        setFormState?.((ownState) => ({ ...ownState, moduleName: val }));
    };

    return (
        <FormItem label='模块名称'>
            <Input
                placeholder='模块名/modules文件夹名称，不带hms前缀'
                onFocus={handleModuleNameFocus}
                onChange={handleChange}
                value={formState?.moduleName}
            />
        </FormItem>
    );
}
