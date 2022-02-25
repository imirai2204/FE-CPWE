import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Greeting from "./Greeting";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import { UserMenu } from "./UserMenu";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

const defaultAvatar = "/default-avatar.png";

export default function BasicMenu(props) {
    const [showMenu, setShowMenu] = React.useState(null);
    const open = Boolean(showMenu);

    const openMenuHandler = (event) => {
        setShowMenu(event.currentTarget);
    };

    const closeMenuHandler = () => {
        setShowMenu(null);
    };

    const hasImageSource = props.src !== undefined;

    const userMenu = UserMenu.map((item) => {
        return (
            <Link to={item.path}>
                <MenuItem onClick={closeMenuHandler}>
                    {item.title}{" "}
                    {item.path === "/login" && (
                        <div className='logout'>
                            <LogoutRoundedIcon />
                        </div>
                    )}
                </MenuItem>
            </Link>
        );
    });

    return (
        <>
            <Button
                id='basic-button'
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup='true'
                aria-expanded={open ? "true" : undefined}
                onClick={openMenuHandler}>
                <Greeting data={props.data} />
                {hasImageSource ? (
                    <Avatar id='user-avatar-navbar' src={props.src} />
                ) : (
                    <Avatar id='user-avatar-navbar' src={defaultAvatar} />
                )}
            </Button>
            <Menu
                id='basic-menu'
                anchorEl={showMenu}
                open={open}
                onClose={closeMenuHandler}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}>
                {userMenu}
            </Menu>
        </>
    );
}
