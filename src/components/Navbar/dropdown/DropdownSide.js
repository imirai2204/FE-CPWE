import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { sideBarActions } from "../../../redux-store/sidebar/sidebar.slice";
import { Link } from "react-router-dom";
import { DropdownItems } from "./DropdownItems";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

const DropdownSide = (props) => {
    const dispatch = useDispatch();
    const isCategoryDisplayed = useSelector((state) => state.sideBar.isCategoryShown);

    const onClickHandler = () => {
        dispatch(sideBarActions.toggleCategory(false));
        props.onClick();
    };

    const onArrowIconClickHandler = () => {
        dispatch(sideBarActions.toggleCategory(false));
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

    const dropdownClassName = isCategoryDisplayed
        ? "dropdown-menu-mobile active"
        : "dropdown-menu-mobile";

    return (
        <div className={dropdownClassName}>
            <ul onClick={onClickHandler} className='dropdown-side'>
                {dropdownMenu}
            </ul>
            <button className='return' onClick={onArrowIconClickHandler}>
                <ArrowCircleLeftIcon />
            </button>
        </div>
    );
};

export default DropdownSide;
