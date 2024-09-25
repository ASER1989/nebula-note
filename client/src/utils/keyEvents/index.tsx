import React, {useEffect, useRef, useState} from "react";
import {EventListener} from './types';
import {EventContext} from "./eventContext";

type Props = {
    children: React.ReactNode | Array<React.ReactNode>;
}

export default function KeyEvents({children}: Props) {
    const listenerRef = useRef<Map<symbol, EventListener>>(new Map<symbol, EventListener>());

    const addListener = (listener: EventListener) => {
        const id = Symbol();
        listenerRef.current.set(id, listener);
        return id;
    }
    const removeListener = (id: symbol) => {
        listenerRef.current.delete(id);
    }

    const handleKeyDown = function (event: DocumentEventMap["keydown"]) {
        console.log('keydown')
        if (listenerRef.current.size > 0) {
            listenerRef.current.forEach((listener) => {
                listener(event);
            })
        }
    }
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, []);

    return (
        <EventContext.Provider value={{addListener, removeListener}}>
            {children}
        </EventContext.Provider>
    )
}