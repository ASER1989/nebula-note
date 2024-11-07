import {Meta, StoryObj} from '@storybook/react';
import Confirm from './index';
import React, {useContext, useEffect, useState} from 'react';
import {ConfirmContext} from './context';
import useConfirmContext from "@client/components/confirm/useConfirmContext";
import Button from "@client/atoms/button";
import _ from 'lodash';

const meta = {
  title: 'Components/Confirm',
  component: Confirm,
  decorators: [(Story) => {
    const providerValue = useConfirmContext();
    return (
      <ConfirmContext.Provider value={providerValue}>
        <Story/>
        <Confirm/>
      </ConfirmContext.Provider>
    )
  }]
} as Meta;

export default meta;

type Story = StoryObj<typeof Confirm>

export const Primary: Story = {
  parameters:{
    docs: {
      source: {
        code: `   
        export const Index =()=>{
          const [, setMessageId] = useState(1);
          const {showConfirm} = useContext(ConfirmContext);

          useEffect(() => {
            showConfirm('test');
          }, []);

          const addNewMessage = (count: number) => {
            for (let i = 0; i < count; i++) {

              setMessageId((messageId) => {
                showConfirm(\`This is the \${messageId}th message.\`);
                return ++messageId;
              });
            }
          }

          return (
              <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                <Button onClick={() => addNewMessage(1)} type='primary'>添加1条新消息</Button>
                <Button onClick={_.partial(addNewMessage, 2)} type='primary'>添加2条新消息</Button>
                <Button onClick={_.partial(addNewMessage, 3)} type='primary'>添加3条新消息</Button>
              </div>
          )
        }
        `
      }
    }
  },
  render: () => {
    const [, setMessageId] = useState(1);
    const {showConfirm} = useContext(ConfirmContext);

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
        <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
          <Button onClick={() => addNewMessage(1)} type='primary'>添加1条新消息</Button>
          <Button onClick={_.partial(addNewMessage, 2)} type='primary'>添加2条新消息</Button>
          <Button onClick={_.partial(addNewMessage, 3)} type='primary'>添加3条新消息</Button>
        </div>
    )
  }
};
