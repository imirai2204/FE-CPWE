import React, { useState, useContext, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../redux-store/user/user.slice";
import { Button } from "../UI/Button/Button";
import { MenuItems } from "./MenuItems";
import { Link } from "react-router-dom";
import Dropdown from "./dropdown/Dropdown";
import DropdownSide from "./dropdown/DropdownSide";
import User from "./greeting/User";
import UserMobile from "./greeting/UserMobile";
import SideBarContext from "../../store/side-bar-context";

const Navbar = (props) => {
    const dispatch = useDispatch();
    const [isClicked, setIsClicked] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const sideBarCtx = useContext(SideBarContext);
    const isCardShow = useSelector((state) => state.user.isCardOpen);
    const userData = useSelector((state) => state.user.userInfo);

    const isMobileSize = window.innerWidth < 1100 ? true : false;
    const clickIconHandler = () => {
        if (sideBarCtx.isCategoryShown || sideBarCtx.isAccountShown) {
            sideBarCtx.onCloseCategory();
            sideBarCtx.onCloseAccount();
        }
        if (isCardShow) {
            dispatch(userActions.toggleUserCard(false));
        }
        setIsClicked(!isClicked);
    };

    const closeMobileMenu = () => {
        setIsClicked(false);
        if (isCardShow || sideBarCtx.isAccountShown || sideBarCtx.isCategoryShown) {
            sideBarCtx.onCloseAccount();
            sideBarCtx.onCloseCategory();
            dispatch(userActions.toggleUserCard(false));
        }
    };
    const onMouseEnter = () => setShowDropdown(!isMobileSize);
    const onMouseLeave = () => setShowDropdown(false);

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
                        onClick={isMobileSize ? sideBarCtx.onShowCategory : false}>
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
                        onClick={isMobileSize ? sideBarCtx.onShowAccount : false}>
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
