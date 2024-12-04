import './index.styl';
import React, { useState, useEffect, FC } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import classNames from 'classnames';

export type Props = {
    title?: string;
    children: JSX.Element | React.ReactElement;
    visible: boolean;
    header?: boolean;
    onClose?: (visible: boolean) => void;
};

export const Dialog: FC<Props> = ({
    children,
    title,
    visible = false,
    header = true,
    onClose,
}) => {
    const [hide, setHide] = useState(true);

    const handleClose = () => {
        setHide(true);
        setTimeout(() => {
            onClose?.(false);
            setHide(false);
        }, 400);
    };
    const handleDocumentKeyDown = (e: DocumentEventMap['keydown']) => {
        if (e.key === 'Escape') {
            handleClose();
        }
    };

    useEffect(() => {
        setTimeout(() => setHide(!visible), 100);
    }, [visible]);

    useEffect(() => {
        document.addEventListener('keydown', handleDocumentKeyDown);
        return () => {
            document.removeEventListener('keydown', handleDocumentKeyDown);
        };
    }, []);

    if (!visible) {
        return;
    }

    return (
        <>
            <div className='component-dialog dialog-panel'>
                <div className={classNames('dialog-container', { hide: hide })}>
                    {header && (
                        <div className='dialog-title'>
                            <div> {title}</div>
                            <div className='dialog-title-operation'>
                                <AiOutlineClose onClick={handleClose} />
                            </div>
                        </div>
                    )}
                    <div className='dialog-content'>{children}</div>
                </div>
            </div>
            <div
                className={classNames('component-dialog mask', { hide: hide })}
                onClick={handleClose}
            ></div>
        </>
    );
};

export default Dialog;
