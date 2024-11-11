import { useState, useRef } from 'react';
import _ from 'lodash';
import type { EventCallback, Options, Props } from './context';
import { defaultContext } from './context';

export default function useConfirmContext() {
    const messageQueueRef = useRef<Array<Options>>([]);
    const [options, setOptions] = useState<Options | null>(null);

    const showConfirm = (arg1: Options | string, callback?: EventCallback) => {
        let newOptions: Options = arg1 as Options;
        if (typeof arg1 === 'string') {
            newOptions = {
                content: arg1,
                callback,
            };
        }
        _.defaults(newOptions, defaultContext.options);
        messageQueueRef.current.push(newOptions);
        setOptions(newOptions);
    };

    const onClose = (confirm?: boolean) => {
        const deleteOptions = messageQueueRef.current.pop();
        const idx = messageQueueRef.current.length;
        const newOptions = messageQueueRef.current[idx - 1];
        setOptions(newOptions);
        deleteOptions?.callback?.(confirm);
    };

    return {
        options,
        showConfirm,
        onClose,
    } as Props;
}
