import React, { useState, Fragment } from "react";
import Button from "@mui/material/Button";
import Greeting from "./Greeting";
import Avatar from "@mui/material/Avatar";
import UserCard from "./UserCard";

const defaultAvatar = "/default-avatar.png";

export default function BasicMenu(props) {
    const [showMenu, setShowMenu] = useState(false);

    const userCardHandler = () => {
        setShowMenu((prev) => !prev);
    };

    const imgSourcePath = props.src !== undefined ? props.src : defaultAvatar;

    return (
        <Fragment>
            <Button id='basic-button' onClick={userCardHandler}>
                <Greeting data={props.data} />
                <Avatar id='user-avatar-navbar' src={imgSourcePath} />
            </Button>
            {showMenu && <UserCard onClose={userCardHandler} imgSource={imgSourcePath} />}
        </Fragment>
    );
}
