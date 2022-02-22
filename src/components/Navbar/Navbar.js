import React, { useState } from "react";
import { Button } from "../UI/button/Button";
import { MenuItems } from "./MenuItems";
import { Link } from "react-router-dom";
import Dropdown from "./dropdown/Dropdown";

const Navbar = (props) => {
    const [isClicked, setIsClicked] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const clickIconHandler = () => setIsClicked(!isClicked);
    const closeMobileMenu = () => setIsClicked(false);
    const onMouseEnter = () => setShowDropdown(window.innerWidth <= 1095 ? false : true);
    const onMouseLeave = () => setShowDropdown(false);

    const mapMenuItems = MenuItems.map((item, index) => {
        if (item.hasMenu) {
            return (
                <li
                    key={index}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    className='nav-items'>
                    <Link className={item.cName} to={item.path} onClick={closeMobileMenu}>
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
        <nav className='NavbarItems'>
            <Link to='/' onClick={closeMobileMenu}>
                <h1 className='navbar-logo'>
                    <i className='fa-brands fa-react'></i>
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
            <Link to='/login' onClick={closeMobileMenu} className='btn--login'>
                <Button>LOGIN</Button>
            </Link>
        </nav>
    );
};

export default Navbar;
