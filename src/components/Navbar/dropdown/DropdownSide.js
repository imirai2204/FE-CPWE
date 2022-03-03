import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DropdownItems } from "./DropdownItems";
import SideBarContext from "../../../store/side-bar-context";

const DropdownSide = (props) => {
    const ctx = useContext(SideBarContext);

    const onClickHandler = () => {
        ctx.onClose();
        props.onClick();
    };

    const dropdownMenu = DropdownItems.map((item, index) => {
        return (
            <li key={index} className='dropdown-items-mobile'>
                <Link
                    className={`${item.cName}-mobile--side--bar`}
                    to={item.path}
                    onClick={onClickHandler}>
                    {item.title}
                </Link>
            </li>
        );
    });

    const dropdownClassName = ctx.isShown
        ? "dropdown-menu-mobile active"
        : "dropdown-menu-mobile";

    return (
        <div className={dropdownClassName}>
            <ul onClick={onClickHandler} className='dropdown-side'>
                {dropdownMenu}
            </ul>
        </div>
    );
};

export default DropdownSide;
