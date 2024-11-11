import './index.styl';
import React, {
    useState,
    useEffect,
    KeyboardEvent,
    forwardRef,
    useRef,
    useImperativeHandle,
} from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import classNames from 'classnames';

export type SidePageProps = {
    title?: string;
    showTitle?: boolean;
    children: JSX.Element | React.ReactElement | Array<React.ReactElement>;
    visible: boolean;
    onVisibleChange?: (visible: boolean) => void;
    style?: React.CSSProperties;
};

interface SidePageDOM {
    getBoundingClientRect: () => DOMRect;
    addEventListener: (
        type: string,
        callback: EventListenerOrEventListenerObject,
    ) => void;
    removeEventListener: (
        type: string,
        callback: EventListenerOrEventListenerObject,
    ) => void;
}

export const SidePage = forwardRef<SidePageDOM | undefined, SidePageProps>(
    (props: SidePageProps, ref) => {
        const {
            children,
            title,
            showTitle,
            visible = false,
            style,
            onVisibleChange,
        } = props;

        const boxRef = useRef<HTMLDivElement>(null);
        const [hide, setHide] = useState(true);
        const handleClose = () => {
            setHide(true);
            setTimeout(() => {
                onVisibleChange?.(false);
            }, 400);
        };

        useImperativeHandle(ref, () => {
            if (boxRef.current) {
                return {
                    getBoundingClientRect: () => {
                        return (
                            boxRef.current?.getBoundingClientRect() ??
                            new DOMRect(0, 0, 0, 0)
                        );
                    },
                    addEventListener: (
                        type: string,
                        callback: EventListenerOrEventListenerObject,
                    ) => {
                        return boxRef.current?.addEventListener(type, callback);
                    },
                    removeEventListener: (
                        type: string,
                        callback: EventListenerOrEventListenerObject,
                    ) => {
                        return boxRef.current?.removeEventListener(type, callback);
                    },
                };
            }
        });

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
                    ref={boxRef}
                    style={style}
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
