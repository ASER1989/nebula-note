import React, { useMemo, useState, ReactElement } from 'react';
import _ from 'lodash';
import TabPane, { TabPaneProps } from './tabPane';
import './index.styl';
import classNames from 'classnames';
import Position from '@client/molecules/position';
import IconButton from '@client/atoms/iconButton';
import { LuX, LuPlus } from 'react-icons/lu';

type TabPaneType = React.ReactElement<TabPaneProps, typeof TabPane>;

export type Props = {
    showPlus?: boolean;
    onPlusClick?: () => void;
    onRemoveClick?: (id: string) => void;
    labelRender?: (option: TabOption, isActive: boolean) => React.ReactNode;
    children: ReactElement<TabPaneProps>[] | ReactElement<TabPaneProps>;
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
    const childList = React.Children.toArray(children) as ReactElement<TabPaneProps>[];

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

    const activeContent = useMemo(() => {
        return childList.find(
            (item, index) => (item.props.id ?? `${index}`) === checkedKey,
        );
    }, [checkedKey, childList]);

    const defaultLabelRender = (option: TabOption) => {
        return <div className='tabs-pane-title'>{option.label}</div>;
    };
    const renderTabs = () =>
        options.map((option) => {
            const isActive = option.id === checkedKey;
            return (
                <div
                    key={option.id}
                    className={classNames('tabs-pane-item', { active: isActive })}
                    onClick={() => setCheckedKey(option.id)}
                >
                    {labelRender
                        ? labelRender(option, isActive)
                        : defaultLabelRender(option)}
                    {option.removable && isActive && renderRemoveButton(option.id)}
                </div>
            );
        });

    const renderRemoveButton = (id: string) => {
        return (
            <Position type='absolute' right={3} top={3}>
                <IconButton
                    onClick={() => onRemoveClick?.(id)}
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

    return (
        <div className='components-tabs'>
            <div className='tabs-pane-list'>
                {renderTabs()}
                {renderPlusButton()}
            </div>
            {activeContent}
        </div>
    );
};

export default Tabs;
