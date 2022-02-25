import React, { useState } from "react";
import Greeting from "./Greeting";
import UserInfo from "./UserInfo";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

const User = (props) => {
    const [openUserInfo, setOpenUserInfo] = useState(false);

    const openUserInfoHandler = () => {
        setOpenUserInfo(!openUserInfo);
    };

    const defaultAvatar = "/default-avatar.png";
    const hasImageSource = props.src !== undefined;

    return (
        <>
            <Stack spacing={2} direction='row'>
                <Button size='medium' onClick={openUserInfoHandler}>
                    <Greeting data={props.userName} />
                    {hasImageSource ? (
                        <Avatar src={props.src} />
                    ) : (
                        <Avatar src={defaultAvatar} />
                    )}
                </Button>
            </Stack>
            <div className='user--info--dropdown'>{openUserInfo && <UserInfo />}</div>
        </>
    );
};

export default User;
