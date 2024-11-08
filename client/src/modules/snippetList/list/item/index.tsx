import React from "react";
import classNames from "classnames";
import {FaPlayCircle} from "react-icons/fa";

import './index.styl';
import IconButton from "@client/atoms/iconButton";

export type Props = {
  name: string,
  isChecked: boolean,
  onClick?: () => void;
  onBuild?: () => void;
};
export const ListItem = ({name, isChecked, onClick, onBuild}: Props) => {

  const className = classNames({"checked": isChecked}, 'snippet-list-item')
  const handleClick = () => {
    onClick?.()
  }

  return (
    <div onClick={handleClick} className={className}>
      <div className='item-name'> {name}</div>
      <div className='item-operation'>
        {isChecked &&
          <IconButton onClick={onBuild}>
            <FaPlayCircle color='#009688' size={23} />
          </IconButton>
        }
      </div>
    </div>
  )
}
