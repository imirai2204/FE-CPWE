import React, { useState } from "react";
import { Button } from "../UI/Button/Button";
import { MenuItems } from "./MenuItems";

const Navbar = (props) => {
    const [isClicked, setIsClicked] = useState(false);

    const clickIconHandler = () => {
        setIsClicked(!isClicked);
    };

    const mapMenuItems = MenuItems.map((item, index) => {
        return (
            <li key={index}>
                <a className={item.cName} href={item.url}>
                    {item.title}
                </a>
            </li>
        );
    });

    const menuIconClasses = isClicked ? "fas fa-times" : "fas fa-bars";
    const navMenuClasses = !isClicked ? "nav-menu" : "nav-menu active";

    return (
        <nav className='NavbarItems'>
            <h1 className='navbar-logo'>
                <i className='fa-brands fa-react'></i>
            </h1>
            <div className='menu-icon' onClick={clickIconHandler}>
                <i className={menuIconClasses}></i>
            </div>
            <ul className={navMenuClasses}>{mapMenuItems}</ul>
            <Button>LOGIN</Button>
        </nav>
    );
};

export default Navbar;
