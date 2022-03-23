import React, { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../redux-store/user/user.slice";
import { sideBarActions } from "../../redux-store/sidebar/sidebar.slice";
import { Button } from "../UI/Button/Button";
import { MenuItems } from "./MenuItems";
import { Link } from "react-router-dom";
import Dropdown from "./dropdown/Dropdown";
import DropdownSide from "./dropdown/DropdownSide";
import User from "./greeting/User";
import UserMobile from "./greeting/UserMobile";

const Navbar = (props) => {
    /** Call hooks to get data from redux-store */
    const dispatch = useDispatch();
    const [isClicked, setIsClicked] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const isCategoryListShown = useSelector((state) => state.sideBar.isCategoryShown);
    const isAccountCardShown = useSelector((state) => state.sideBar.isAccountShown);
    const isCardShown = useSelector((state) => state.user.isCardOpen);
    const userData = useSelector((state) => state.user.userInfo);

    const isMobileSize = window.innerWidth < 1100 ? true : false;

    /** Hand Icon Click on Navbar */
    const clickIconHandler = () => {
        if (isCategoryListShown || isAccountCardShown) {
            dispatch(sideBarActions.toggleCategory(false));
            dispatch(sideBarActions.toggleUserCardMobile(false));
        }
        if (isCardShown) {
            dispatch(userActions.toggleUserCard(false));
        }
        setIsClicked(!isClicked);
    };

    /** For Mobile Size */
    const closeMobileMenu = () => {
        setIsClicked(false);
        if (isCategoryListShown) {
            dispatch(sideBarActions.toggleCategory(false));
        }
        if (isAccountCardShown) {
            dispatch(sideBarActions.toggleUserCardMobile(false));
        }
        if (isCardShown) {
            dispatch(userActions.toggleUserCard(false));
        }
    };

    const onClickAccountHandler = () => {
        dispatch(sideBarActions.toggleUserCardMobile(true));
    };

    const onClickCategoryHandler = () => {
        dispatch(sideBarActions.toggleCategory(true));
    };
    /** For Mobile Size */

    /** Event listener for Category dropdown */
    const onMouseEnter = () => setShowDropdown(!isMobileSize);
    const onMouseLeave = () => setShowDropdown(false);

    /** Retrieve navbar items from MenuItems.js and render on Navbar */
    const mapMenuItems = MenuItems.map((item, index) => {
        if (item.hasDropdown) {
            return (
                <li
                    key={index}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    className='nav-items'>
                    <Link
                        className={item.cName}
                        to={item.path}
                        onClick={isMobileSize ? onClickCategoryHandler : false}>
                        {item.title}
                    </Link>
                    {showDropdown && <Dropdown />}
                </li>
            );
        }
        if (item.cName.includes("user-card")) {
            return (
                <li key={index} className='nav-items'>
                    <Link
                        className={item.cName}
                        to={item.path}
                        onClick={isMobileSize ? onClickAccountHandler : false}>
                        {item.title}
                    </Link>
                </li>
            );
        }
        return (
            <li key={index} className='nav-items'>
                <Link className={item.cName} to={item.path} onClick={closeMobileMenu}>
                    {item.title}
                </Link>
            </li>
        );
    });

    const menuIconClasses = isClicked ? "fas fa-times" : "fas fa-bars";
    const navMenuClasses = !isClicked ? "nav-menu" : "nav-menu active";

    /** Return ready navbar component */
    return (
        <Fragment>
            <nav className='NavbarItems'>
                <Link to='/' onClick={closeMobileMenu}>
                    <h1 className='navbar-logo'>
                        <i className='logo'></i>
                    </h1>
                </Link>
                <div className='menu-icon' onClick={clickIconHandler}>
                    <i className={menuIconClasses}></i>
                </div>
                <ul className={navMenuClasses}>
                    {mapMenuItems}
                    <div className='btn--create--idea'>
                        <Button onClick={props.onClickCreateBtn}>CREATE</Button>
                    </div>
                </ul>
                <User userName={userData.fullName} src={userData.avatar} />
            </nav>
            <DropdownSide onClick={closeMobileMenu} />
            <UserMobile onClick={closeMobileMenu} src={userData.avatar} />
        </Fragment>
    );
};

export default Navbar;
