import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DropdownItems } from "./DropdownItems";

const DropdownSide = (props) => {
    const [isClicked, setIsClicked] = useState(false);

    const clickHandler = () => setIsClicked(!isClicked);

    const dropdownMenuClasses = isClicked
        ? "dropdown-menu-mobile clicked"
        : "dropdown-menu-mobile";

    const onClickHandler = () => {
        setIsClicked(false);
        props.onClick();
    };

    const dropdownMenu = DropdownItems.map((item, index) => {
        return (
            <li key={index} className='dropdown-items'>
                <Link
                    className={`${item.cName}-mobile--side--bar`}
                    to={item.path}
                    onClick={onClickHandler}>
                    {item.title}
                </Link>
            </li>
        );
    });

    return (
        <ul onClick={clickHandler} className={dropdownMenuClasses}>
            {dropdownMenu}
        </ul>
    );
};

export default DropdownSide;
