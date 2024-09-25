import './index.styl';
import React from 'react';
import classNames from "classnames";


type MenuProps = {
    checkedKey: string | undefined;
    onChange: (key: string) => void;
    menuConfig: Array<{
        key: string;
        label: string;
    }>;
};

const Menu = ({ checkedKey, menuConfig, onChange }: MenuProps) => {
    
    
    const handleClick = (key: string) => {
        onChange(key);
    }
    
    return (
        <div className='menu'>
            {
                menuConfig.map((item) => {
                    const isChecked = item.key === checkedKey
                    return (
                        <div
                            key={item.key}
                            className={classNames('menu-item', { 'checked': isChecked })}
                            onClick={() => handleClick(item.key)}
                        >
                            {item.label}
                        </div>
                    )
                })
            }
        </div>
    );
}
Menu.displayName = 'Menu';
export default Menu;
