import React, { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../redux-store/user/user.slice";
import { Link } from "react-router-dom";
import { CategoryDropdownItems } from "./DropdownItems";

const CategoryDesktop = () => {
    const dispatch = useDispatch();
    const [isClicked, setIsClicked] = useState(false);
    const isUserCardOpen = useSelector((state) => state.user.isCardOpen);

    const clickHandler = () => {
        setIsClicked(!isClicked);
        if (isUserCardOpen) {
            dispatch(userActions.toggleUserCard(false));
        }
    };

    const dropdownMenuClasses = isClicked ? "dropdown-menu clicked" : "dropdown-menu";

    const dropdownMenu = CategoryDropdownItems.map((item, index) => {
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
        <Fragment>
            <ul onClick={clickHandler} className={dropdownMenuClasses}>
                {dropdownMenu}
            </ul>
        </Fragment>
    );
};

export default CategoryDesktop;
