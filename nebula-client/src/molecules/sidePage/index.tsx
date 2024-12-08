import './index.styl';
import React, { KeyboardEvent, forwardRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import { AiOutlineClose } from 'react-icons/ai';

export type SidePageProps = {
    title?: string;
    showTitle?: boolean;
    children: JSX.Element | React.ReactElement | Array<React.ReactElement>;
    visible: boolean;
    onVisibleChange?: (visible: boolean) => void;
    style?: React.CSSProperties;
    ['data-test-id']?: string;
};

export const SidePage = forwardRef<HTMLDivElement, SidePageProps>(
    (props: SidePageProps, ref) => {
        const {
            children,
            title,
            showTitle,
            visible = false,
            style,
            onVisibleChange,
            'data-test-id': dataTestId,
        } = props;

        const [hide, setHide] = useState(true);
        const handleClose = () => {
            setHide(true);
            setTimeout(() => {
                onVisibleChange?.(false);
            }, 400);
        };

        useEffect(() => {
            setTimeout(() => setHide(!visible), 0);
        }, [visible]);

        useEffect(() => {
            const handleKeydown = (event: unknown) => {
                if ((event as KeyboardEvent).key === 'Escape') {
                    handleClose();
                }
            };

            document.addEventListener('keydown', handleKeydown);
            return () => {
                document.removeEventListener('keydown', handleKeydown);
            };
        }, []);

        if (!visible) {
            return;
        }
        return (
            <>
                <div
                    className={classNames('component-side-page side-pane', {
                        hide: hide,
                    })}
                    ref={ref}
                    style={style}
                    data-test-id={dataTestId}
                >
                    {showTitle && (
                        <div className='side-pane-title'>
                            <div className='pane-title-label'> {title}</div>
                            <div className='pane-title-operation'>
                                <AiOutlineClose onClick={handleClose} />
                            </div>
                        </div>
                    )}
                    <div className='side-pane-content'>{children}</div>
                </div>
                <div
                    className={classNames('component-side-page mask', { hide: hide })}
                    onClick={handleClose}
                ></div>
            </>
        );
    },
);
SidePage.displayName = 'SidePage';
