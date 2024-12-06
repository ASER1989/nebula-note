import './index.styl';
import React from 'react';
import classNames from 'classnames';

export type MenuConfigObject = {
    path: string;
    label: string;
};

type MenuProps = {
    checkedKey: string | undefined;
    onChange: (key: string) => void;
    menuConfig: Array<MenuConfigObject>;
};

const Menu = ({ checkedKey, menuConfig, onChange }: MenuProps) => {
    const handleClick = (path: string) => {
        onChange(path);
    };

    return (
        <div className='menu'>
            {menuConfig.map((item) => {
                const isChecked = item.path === checkedKey;
                return (
                    <div
                        key={item.path}
                        className={classNames('menu-item', { checked: isChecked })}
                        onClick={() => handleClick(item.path)}
                    >
                        {item.label}
                    </div>
                );
            })}
        </div>
    );
};
Menu.displayName = 'Menu';
export default Menu;
