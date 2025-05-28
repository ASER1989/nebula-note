import './index.styl';
import React from 'react';
import { Stack, StackItem } from '@nebula-note/ui';
import { FaServer } from 'react-icons/fa';
import { HiOutlineDesktopComputer } from 'react-icons/hi';

export const SuspenseLoading = () => {
    return (
        <div className='suspense-loading'>
            <div className='loading-animation-box'>
                <Stack spacing={10}>
                    <StackItem>
                        <FaServer size='32' color='#aaa' />
                    </StackItem>
                    <StackItem flex style={{ display: 'flex', alignItems: 'center' }}>
                        <div className='animation-path'></div>
                    </StackItem>
                    <StackItem>
                        <HiOutlineDesktopComputer size='32' color='#aaa' />
                    </StackItem>
                </Stack>
            </div>
        </div>
    );
};

export default SuspenseLoading;
