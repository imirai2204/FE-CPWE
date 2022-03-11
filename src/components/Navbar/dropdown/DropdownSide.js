import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DropdownItems } from "./DropdownItems";
import SideBarContext from "../../../store/side-bar-context";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

const DropdownSide = (props) => {
    const categoryMobileCtx = useContext(SideBarContext);

    const onClickHandler = () => {
        categoryMobileCtx.onCloseCategory();
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

    const dropdownClassName = categoryMobileCtx.isCategoryShown
        ? "dropdown-menu-mobile active"
        : "dropdown-menu-mobile";

    return (
        <div className={dropdownClassName}>
            <ul onClick={onClickHandler} className='dropdown-side'>
                {dropdownMenu}
            </ul>
            <button className='return' onClick={categoryMobileCtx.onCloseCategory}>
                <ArrowCircleLeftIcon />
            </button>
        </div>
    );
};

export default DropdownSide;
