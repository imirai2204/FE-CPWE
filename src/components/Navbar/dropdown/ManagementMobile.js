import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { sideBarActions } from "../../../redux-store/sidebar/sidebar.slice";
import { Link } from "react-router-dom";
import { ManagementDropdownItems } from "./DropdownItems";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

const ManagementMobile = (props) => {
    const dispatch = useDispatch();
    const isMgmtDisplayed = useSelector((state) => state.sideBar.isManagementShown);

    const onClickHandler = () => {
        dispatch(sideBarActions.toggleManagement(false));
        props.onClick();
    };

    const onArrowIconClickHandler = () => {
        dispatch(sideBarActions.toggleManagement(false));
    };

    const dropdownMenu = ManagementDropdownItems.map((item, index) => {
        return (
            <li key={index} className='dropdown-items-mobile'>
                <Link
                    className={`${item.cName} mobile--side--link`}
                    to={item.path}
                    onClick={onClickHandler}>
                    {item.title.concat(' Management')}
                </Link>
            </li>
        );
    });

    const dropdownClassName = isMgmtDisplayed
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

export default ManagementMobile;
