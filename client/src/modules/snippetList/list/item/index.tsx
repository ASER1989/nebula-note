import React from "react";
import classNames from "classnames";
import './index.styl';

export type Props = {
  name: string,
  isChecked: boolean,
  onClick?: () => void;
};
export const ListItem = ({name, isChecked, onClick}: Props) => {

  const className = classNames({"checked": isChecked}, 'snippet-list-item')
  const handleClick = () => {
    onClick?.()
  }

  return (
    <div onClick={handleClick} className={className}>
      <div className='item-name'> {name}</div>
    </div>
  )
}
