import {Meta, StoryObj} from '@storybook/react';
import Confirm from './index';
import React, {useEffect, useState} from 'react';
import {ConfirmContext} from './context';
import useConfirmContext from "@client/components/confirm/useConfirmContext";
import Button from "@client/atoms/button";
import _ from 'lodash';

const meta = {
  title: 'Components/Confirm',
  component: Confirm,
} as Meta;

export default meta;

type Story = StoryObj<typeof Confirm>

export const Primary: Story = {
  render: () => {
    const [, setMessageId] = useState(1);
    const providerValue = useConfirmContext();
    const {showConfirm} = providerValue;
    useEffect(() => {
      showConfirm('test');
    }, []);

    const addNewMessage = (count: number) => {
      for (let i = 0; i < count; i++) {

        setMessageId((messageId) => {
          showConfirm(`This is the ${messageId}th message.`);
          return ++messageId;
        });
      }
    }

    return (
      <div style={{height: 'calc(100vh - 2rem)', width: 'calc(100vw - 2rem)'}}>
        <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
          <Button onClick={() => addNewMessage(1)} type='primary'>添加1条新消息</Button>
          <Button onClick={_.partial(addNewMessage, 2)} type='primary'>添加2条新消息</Button>
          <Button onClick={_.partial(addNewMessage, 3)} type='primary'>添加3条新消息</Button>
        </div>
        <ConfirmContext.Provider value={providerValue}>
          <Confirm/>
        </ConfirmContext.Provider>
      </div>
    )
  }
};
