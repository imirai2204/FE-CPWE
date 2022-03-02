import React, { useState } from "react";
import { Button } from "../UI/Button/Button";
import { MenuItems } from "./MenuItems";
import { Link } from "react-router-dom";
import Dropdown from "./dropdown/Dropdown";
import DropdownSide from "./dropdown/DropdownSide";
import User from "./greeting/User";

const Navbar = (props) => {
    const [isClicked, setIsClicked] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDropdownSideBar, setShowDropdownSideBar] = useState(false);

    let isMobileSize = window.innerWidth < 1150 ? true : false;
    const clickIconHandler = () => {
        setIsClicked(!isClicked);
        if (showDropdownSideBar) {
            setShowDropdownSideBar((prev) => {
                return !prev;
            });
        }
    };

    const closeMobileMenu = () => {
        setIsClicked(false);
    };

    const onMouseEnter = () => setShowDropdown(!isMobileSize);
    const onMouseLeave = () => setShowDropdown(false);

    const clickCategoryHandler = () => {
        console.log(isMobileSize);

        if (isMobileSize) {
            setShowDropdownSideBar((prev) => {
                return !prev;
            });
        } else {
            return false;
        }
    };

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
                        onClick={clickCategoryHandler}>
                        {item.title}
                    </Link>
                    {showDropdown && !showDropdownSideBar && <Dropdown />}
                    {!showDropdown && showDropdownSideBar && (
                        <DropdownSide onClick={closeMobileMenu} />
                    )}
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

    /* Logic to check if user login
            const userLoginHandler = () => {
                ...logic here
                setIsLogin(true)
            }
        */

    const menuIconClasses = isClicked ? "fas fa-times" : "fas fa-bars";
    const navMenuClasses = !isClicked ? "nav-menu" : "nav-menu active";

    return (
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
                    {/* <Button onClick={props.onClickCreateBtn}>CREATE</Button> */}
                    <Button onClick={props.onClickCreateBtn}>CREATE</Button>
                </div>
            </ul>
            <User data='Cody' />
        </nav>
    );
};
export default Navbar;
