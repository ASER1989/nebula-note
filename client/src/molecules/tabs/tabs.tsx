import React, { useMemo, useState, ReactElement, useEffect } from 'react';
import _ from 'lodash';
import { TabPaneProps } from './tabPane';
import './index.styl';
import classNames from 'classnames';
import Position from '@client/molecules/position';
import IconButton from '@client/atoms/iconButton';
import { LuX, LuPlus } from 'react-icons/lu';

export type Props = {
    activePaneId?: string;
    showPlus?: boolean;
    onPlusClick?: () => void;
    onTabChange?: (id: string) => void;
    labelRender?: (option: TabOption, isActive: boolean) => React.ReactNode;
    children: ReactElement<TabPaneProps>[] | ReactElement<TabPaneProps>;
};

export type TabOption = {
    id: string;
    label: string;
    onRemove?: () => void;
};

/*
 * 简易tabs
 * 处理页面中诸多类似tabs，但风格与常规tabs设计不同的多页签布局
 * */
const Tabs = ({
    activePaneId,
    showPlus,
    onPlusClick,
    children,
    labelRender,
    onTabChange,
}: Props) => {
    const childList = React.Children.toArray(children) as ReactElement<TabPaneProps>[];
    const options = useMemo<Array<TabOption>>(() => {
        return childList.map((item, itemIndex) => {
            return {
                id: item.props.id ?? `tabPane_${itemIndex}`,
                label: item.props.title,
                onRemove: item.props.onRemoveClick,
            };
        });
    }, [childList]);

    const firstPanel = _.head(options);
    const [checkedKey, setCheckedKey] = useState<string>(
        activePaneId ?? firstPanel?.id ?? '',
    );

    const activeContent = useMemo(() => {
        return childList.find(
            (item, index) => (item.props.id ?? `${index}`) === checkedKey,
        );
    }, [checkedKey, childList]);

    useEffect(() => {
        setCheckedKey(activePaneId ?? firstPanel?.id ?? '');
    }, [activePaneId]);

    const handleTabChange = (id: string) => {
        setCheckedKey(id);
        onTabChange?.(id);
    };
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
                    onClick={() => handleTabChange(option.id)}
                >
                    {labelRender
                        ? labelRender(option, isActive)
                        : defaultLabelRender(option)}
                    {option.onRemove && isActive && renderRemoveButton(option.onRemove)}
                </div>
            );
        });

    const renderRemoveButton = (handleRemoveClick: () => void) => {
        return (
            <Position type='absolute' right={3} top={3}>
                <IconButton onClick={handleRemoveClick} type='circle' hoverEnabled>
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
