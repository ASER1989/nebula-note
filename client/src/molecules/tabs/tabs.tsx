import React, { useMemo, useState } from 'react';
import _ from 'lodash';
import TabPane, { TabPaneProps } from './tabPane';
import './index.styl';
import classNames from 'classnames';
import Position from '@client/molecules/position';
import IconButton from '@client/atoms/iconButton';
import { LuX, LuPlus } from 'react-icons/lu';

type childType = React.ReactElement<TabPaneProps, typeof TabPane>;

export type Props = {
    showPlus?: boolean;
    onPlusClick?: () => void;
    onRemoveClick?: (id: string) => void;
    labelRender?: (option: TabOption, isActive: boolean) => React.ReactNode;
    children: childType | Array<childType>;
};
export type TabOption = {
    id: string;
    label: string;
    removable?: boolean;
};

/*
 * 简易tabs
 * 处理页面中诸多类似tabs，但风格与常规tabs设计不同的多页签布局
 * */
const Tabs = ({ showPlus, onPlusClick, children, onRemoveClick, labelRender }: Props) => {
    const childList = _.castArray<React.ReactElement>(children);
    const firstPanel = _.head(childList);
    const [checkedKey, setCheckedKey] = useState<string>(firstPanel?.props.id ?? '0');

    const options = useMemo<Array<TabOption>>(() => {
        return childList.map((item, itemIndex) => {
            return {
                id: item.props.id ?? `${itemIndex}`,
                label: item.props.title,
                removable: item.props.removable,
            };
        });
    }, [childList]);

    const content = useMemo(() => {
        return childList.find(
            (item, index) => (item.props.id ?? `${index}`) === checkedKey,
        );
    }, [checkedKey, childList]);

    const handleRadioChange = (checkedKey: string) => {
        setCheckedKey(checkedKey);
    };

    const renderRemoveButton = (option: TabOption) => {
        if (!option.removable || option.id !== checkedKey) {
            return;
        }
        return (
            <Position type='absolute' right={3} top={3}>
                <IconButton
                    onClick={() => onRemoveClick?.(option.id)}
                    type='circle'
                    hoverEnabled
                >
                    <LuX></LuX>
                </IconButton>
            </Position>
        );
    };

    const renderPlusButton = () => {
        if (showPlus) {
            return (
                <IconButton className='tabs-pane-plus' onClick={onPlusClick}>
                    <LuPlus color='#FFFFFF' />
                </IconButton>
            );
        }
    };

    const renderLabel = (option: TabOption, isActive: boolean) => {
        if (labelRender) {
            return labelRender(option, isActive);
        }
        return <div className='tabs-pane-title'>{option.label}</div>;
    };

    return (
        <div className='components-tabs'>
            <div className='tabs-pane-list'>
                {options.map((item, idx) => {
                    const isActive = item.id === checkedKey;
                    return (
                        <div
                            key={idx}
                            className={classNames('tabs-pane-item', {
                                active: isActive,
                            })}
                            onClick={() => handleRadioChange(item.id)}
                        >
                            {renderLabel(item, isActive)}
                            {renderRemoveButton(item)}
                        </div>
                    );
                })}
                {renderPlusButton()}
            </div>
            {content}
        </div>
    );
};

export default Tabs;
