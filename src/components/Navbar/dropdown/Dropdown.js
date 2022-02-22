import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DropdownItems } from "./DropdownItems";

const Dropdown = () => {
    const [isClicked, setIsClicked] = useState(false);

    const clickHandler = () => setIsClicked(!isClicked);

    const dropdownMenuClasses = isClicked ? "dropdown-menu clicked" : "dropdown-menu";

    const dropdownMenu = DropdownItems.map((item, index) => {
        return (
            <li key={index} className='dropdown-items'>
                <Link
                    className={item.cName}
                    to={item.path}
                    onClick={() => setIsClicked(false)}>
                    {item.title}
                </Link>
            </li>
        );
    });

    return (
        <>
            <ul onClick={clickHandler} className={dropdownMenuClasses}>
                {dropdownMenu}
            </ul>
        </>
    );
};

export default Dropdown;
