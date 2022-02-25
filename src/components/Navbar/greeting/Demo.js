import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Greeting from "./Greeting";
import Avatar from "@mui/material/Avatar";

export default function PositionedMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const defaultAvatar = "/default-avatar.png";
    const hasImageSource = props.src !== undefined;

    return (
        <div>
            <Button
                id='btn-user-info-menu'
                aria-controls={open ? "user-info-menu" : undefined}
                aria-haspopup='true'
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}>
                <Greeting data={props.data} />
                {hasImageSource ? (
                    <Avatar src={props.src} />
                ) : (
                    <Avatar src={defaultAvatar} />
                )}
            </Button>
            <Menu
                id='user-info-menu'
                aria-labelledby='user-info-button'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </div>
    );
}
