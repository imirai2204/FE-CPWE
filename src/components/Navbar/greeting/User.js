import React from "react";
import Button from "@mui/material/Button";
import Greeting from "./Greeting";
import Avatar from "@mui/material/Avatar";
import UserCard from "./UserCard";

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
            {showMenu && <UserCard onClose={closeMenuHandler} />}
        </>
    );
}
