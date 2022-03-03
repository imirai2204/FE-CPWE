import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DropdownItems } from "./DropdownItems";
import SideBarContext from "../../../store/side-bar-context";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

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
                    className={`${item.cName} mobile--side--link`}
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
            <button className='return' onClick={ctx.onClose}>
                <ArrowCircleLeftIcon />
            </button>
        </div>
    );
};

export default DropdownSide;
