import React, {useContext} from 'react';
import Button from '@client/atoms/button';
import {ConfirmContext} from './context';
import {Dialog} from "@client/molecules/dialog";
import './index.styl'

export default function Confirm() {
  const {
    content,
    onClose
  } = useContext(ConfirmContext);

  if (!content) {
    return null;
  }

  const handleClose = () => {
    onClose(false);
  };

  const handleConfirm = () => {
    onClose(true);
  }

  return (
    <Dialog visible={content != null} onClose={handleClose}>
      <div className='confirm'>
        <div className='content'>{content}</div>
        <div className='bottom'>
          <Button onClick={handleClose}>
            取消
          </Button>
          <Button type='primary' onClick={handleConfirm}>
            确定
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
