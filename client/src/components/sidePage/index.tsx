import './index.styl';
import React, {useState, useEffect, KeyboardEvent} from 'react';
import {AiOutlineClose} from 'react-icons/ai';
import classNames from 'classnames';

type SidePageProps = {
    title?: string;
    showTitle?: boolean;
    children: JSX.Element | React.ReactElement;
    visible: boolean;
    onVisibleChange?: (visible: boolean) => void;
};

export function SidePage({children, title, showTitle, visible = false, onVisibleChange}: SidePageProps) {

    const [hide, setHide] = useState(true);
    const handleClose = () => {
        setHide(true);
        setTimeout(() => {
            onVisibleChange?.(false);
        }, 400);
    }

    useEffect(() => {
        setTimeout(() => setHide(!visible), 0);
    }, [visible]);

    useEffect(() => {
        const handleKeydown = (event: unknown) => {
            if ((event as KeyboardEvent).key === 'Escape') {
                handleClose()
            }
        }

        document.addEventListener('keydown', handleKeydown);
        return () => {
            document.removeEventListener('keydown', handleKeydown)
        }
    }, []);

    if (!visible) {
        return;
    }
    return (
        <>
            <div className={classNames('component-side-page side-pane', {'hide': hide})}>
                {
                    showTitle && <div className='side-pane-title'>
                        <div className='pane-title-label'> {title}</div>
                        <div className='pane-title-operation'>
                            <AiOutlineClose onClick={handleClose}/>
                        </div>
                    </div>
                }
                <div className='side-pane-content'>
                    {children}
                </div>
            </div>
            <div className={classNames('component-side-page mask', {'hide': hide})} onClick={handleClose}></div>
        </>
    );
}
