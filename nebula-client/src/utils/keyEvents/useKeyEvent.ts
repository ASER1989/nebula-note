import { useContext, useEffect, useState } from 'react';
import { EventContext } from './eventContext';
import { EventListener } from './types';

export default function useKeyEvent(callback?: EventListener) {
    const { addListener, removeListener } = useContext(EventContext);

    const [eventList, setEventList] = useState<Array<symbol>>([]);

    const addListen = (callback: EventListener) => {
        const listenId = addListener(callback);
        setEventList((ownState) => [...ownState, listenId]);
        return () => {
            removeListener(listenId);
        };
    };

    useEffect(() => {
        let remove: any;
        if (callback) {
            remove = addListen(callback);
        }
        return () => {
            remove?.();
        };
    }, [callback]);

    useEffect(() => {
        return () => {
            eventList.forEach((item) => removeListener(item));
        };
    }, [eventList]);

    return addListen;
}
