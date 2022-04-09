import React, { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../redux-store/user/user.slice";
import { sideBarActions } from "../../redux-store/sidebar/sidebar.slice";
import { Button } from "../UI/Button/Button";
import { MenuItems } from "./MenuItems";
import { Link } from "react-router-dom";
import CategoryDesktop from "./dropdown/CategoryDesktop";
import CategoryMobile from "./dropdown/CategoryMobile";
import ManagementDesktop from "./dropdown/ManagementDesktop";
import ManagementMobile from "./dropdown/ManagementMobile";
import User from "./greeting/User";
import UserMobile from "./greeting/UserMobile";

const Navbar = (props) => {
    /** Call hooks to get data from redux-store */
    const dispatch = useDispatch();
    const [isClicked, setIsClicked] = useState(false);
    const [showCateDropdown, setShowCateDropdown] = useState(false);
    const [showMgmtDropdown, setShowMgmtDropdown] = useState(false);
    const isCategoryListShown = useSelector((state) => state.sideBar.isCategoryShown);
    const isMgmtListShown = useSelector((state) => state.sideBar.isManagementShown);
    const isAccountCardShown = useSelector((state) => state.sideBar.isAccountShown);
    const isCardShown = useSelector((state) => state.user.isCardOpen);
    const userData = useSelector((state) => state.user.userInfo);

    const isMobileSize = window.innerWidth < 1100 ? true : false;

    /** Hand Icon Click on Navbar */
    const clickIconHandler = () => {
        if (isCategoryListShown || isAccountCardShown || isMgmtListShown) {
            dispatch(sideBarActions.toggleCategory(false));
            dispatch(sideBarActions.toggleManagement(false));
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
        if (isMgmtListShown) {
            dispatch(sideBarActions.toggleManagement(false));
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

    const onClickMgmtHandler = () => {
        dispatch(sideBarActions.toggleManagement(true));
    };
    /** For Mobile Size */

    /** Event listener for Category and Management dropdown */
    const onMouseEnterCategory = () => setShowCateDropdown(!isMobileSize);
    const onMouseLeaveCategory = () => setShowCateDropdown(false);
    const onMouseEnterMgmt = () => setShowMgmtDropdown(!isMobileSize);
    const onMouseLeaveMgmt = () => setShowMgmtDropdown(false);

    /** Retrieve navbar items from MenuItems.js and render on Navbar */
    const mapMenuItems = MenuItems.map((item, index) => {
        if (item.isCategory === true) {
            return (
                <li
                    key={index}
                    onMouseEnter={onMouseEnterCategory}
                    onMouseLeave={onMouseLeaveCategory}
                    className='nav-items'>
                    <Link
                        className={item.cName}
                        to={item.path}
                        onClick={isMobileSize ? onClickCategoryHandler : false}>
                        {item.title}
                    </Link>
                    {showCateDropdown && <CategoryDesktop />}
                </li>
            );
        } else if (item.isManagement === true) {
            return (
                <li
                    key={index}
                    onMouseEnter={onMouseEnterMgmt}
                    onMouseLeave={onMouseLeaveMgmt}
                    className='nav-items'>
                    <Link
                        className={item.cName}
                        to={item.path}
                        onClick={isMobileSize ? onClickMgmtHandler : false}>
                        {item.title}
                    </Link>
                    {showMgmtDropdown && <ManagementDesktop />}
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
            <ManagementMobile onClick={closeMobileMenu} />
            <CategoryMobile onClick={closeMobileMenu} />
            <UserMobile onClick={closeMobileMenu} src={userData.avatar} />
        </Fragment>
    );
};

export default Navbar;
