import React, { useMemo, useState } from 'react';
import _ from 'lodash';
import TabPane, { TabPaneProps } from './tabPane';
import './index.styl';
import classNames from 'classnames';

type childType = React.ReactElement<TabPaneProps, typeof TabPane>;
type Props = {
    children: childType | Array<childType>;
};
/*
 * 简易tabs
 * 处理页面中诸多类似tabs，但风格与常规tabs设计不同的多页签布局
 * */
const Tabs = ({ children }: Props) => {
    const childList = _.castArray<React.ReactElement>(children);
    const firstPanel = _.head(childList);
    const [checkedKey, setCheckedKey] = useState<string>(firstPanel?.props.id ?? '0');

    const options = useMemo(() => {
        return childList.map((item, itemIndex) => {
            return {
                id: item.props.id ?? `${itemIndex}`,
                label: item.props.title,
            };
        });
    }, []);

    const content = useMemo(() => {
        return childList.find(
            (item, index) => (item.props.id ?? `${index}`) === checkedKey,
        );
    }, [checkedKey, childList]);

    const handleRadioChange = (checkedKey: string) => {
        setCheckedKey(checkedKey);
    };

    return (
        <div className='components-tabs'>
            <div className='tabs-pane-list'>
                {options.map((item, idx) => {
                    return (
                        <div
                            key={idx}
                            className={classNames('tabs-pane-item', {
                                active: item.id === checkedKey,
                            })}
                            onClick={() => handleRadioChange(item.id)}
                        >
                            {item.label}
                        </div>
                    );
                })}
            </div>
            {content}
        </div>
    );
};

export default Tabs;
