import React, { useState, useContext, Fragment } from "react";
import { Button } from "../UI/Button/Button";
import { MenuItems } from "./MenuItems";
import { Link } from "react-router-dom";
import Dropdown from "./dropdown/Dropdown";
import DropdownSide from "./dropdown/DropdownSide";
import User from "./greeting/User";
import SideBarContext from "../../store/side-bar-context";

const Navbar = (props) => {
    const [isClicked, setIsClicked] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const ctx = useContext(SideBarContext);

    const isMobileSize = window.innerWidth < 1100 ? true : false;
    const clickIconHandler = () => {
        if (ctx.isShown) {
            ctx.onClose();
        }
        setIsClicked(!isClicked);
    };

    const closeMobileMenu = () => setIsClicked(false);
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
                        onClick={isMobileSize ? ctx.onShow : false}>
                        {item.title}
                    </Link>
                    {showDropdown && <Dropdown />}
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
                <User data='Cody' />
            </nav>
            <DropdownSide onClick={closeMobileMenu} />
        </Fragment>
    );
};

export default Navbar;
