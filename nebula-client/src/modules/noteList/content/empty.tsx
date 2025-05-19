import React from 'react';
import { useLocalization } from '@client/localizations/useLocalization';

const Empty = () => {
    const { getText } = useLocalization();

    return (
        <div className='note-content-empty'>
            <div className='empty-header'></div>
            <div className='empty-tip'>
                <p>{getText('这下怎么办?')}</p>
                <p>{getText('点击左侧右上角新建按钮创建一个.')}</p>
                <p>{getText('从左侧选择一项开始操作.')}</p>
            </div>
        </div>
    );
};

export default Empty;
