import './index.styl';
import React, {
    ForwardedRef,
    ReactElement,
    forwardRef,
    useEffect,
    useMemo,
    useState,
} from 'react';
import IconButton from '@ui/atoms/iconButton';
import Position from '@ui/molecules/position';
import ScrollBox from '@ui/molecules/scrollBox';
import classNames from 'classnames';
import _ from 'lodash';
import { LuPlus, LuX } from 'react-icons/lu';
import { TabPaneProps } from './tabPane';

export type Props = {
    activePaneId?: string;
    showPlus?: boolean;
    onPlusClick?: () => void;
    onTabChange?: (id: string) => void;
    labelRender?: (option: TabOption, isActive: boolean) => React.ReactNode;
    children: ReactElement<TabPaneProps>[] | ReactElement<TabPaneProps>;
    ['data-test-id']?: string;
};

export type TabOption = {
    id: string;
    label: string;
    onRemove?: () => void;
    ['data-test-id']?: string;
};

/*
 * 简易tabs
 * 处理页面中诸多类似tabs，但风格与常规tabs设计不同的多页签布局
 * */
const TabBase = (
    {
        activePaneId,
        showPlus,
        onPlusClick,
        children,
        labelRender,
        onTabChange,
        'data-test-id': dataTestId,
    }: Props,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    const childList = React.Children.toArray(children) as ReactElement<TabPaneProps>[];
    const options = useMemo<Array<TabOption>>(() => {
        return childList.map((item, itemIndex) => {
            return {
                id: item.props.id ?? `tabPane_${itemIndex}`,
                label: item.props.title,
                onRemove: item.props.onRemoveClick,
                ['data-test-id']: item.props['data-test-id'],
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
                    data-test-id={option['data-test-id']}
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
                <IconButton
                    onClick={handleRemoveClick}
                    type='circle'
                    hoverMode='highlight'
                >
                    <LuX size={14} />
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
        <div className='nebula-tabs' ref={ref} data-test-id={dataTestId}>
            <div className='tabs-nav'>
                <ScrollBox>
                    <div className='tabs-pane-list'>
                        {renderTabs()}
                        {renderPlusButton()}
                    </div>
                </ScrollBox>
            </div>
            {activeContent}
        </div>
    );
};
export const Tabs = forwardRef(TabBase);
export default Tabs;
