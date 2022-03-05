import { useState } from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Greeting from "./Greeting";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

const defaultAvatar = "/default-avatar.png";

const User = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [toggleDisplay, setToggleDisplay] = useState(null);

    const handleClick = (event) => {
        setToggleDisplay(event.currentTarget);
        setIsOpen((previousOpen) => !previousOpen);
    };

    const imgSourcePath = props.src !== undefined ? props.src : defaultAvatar;

    const canBeOpen = isOpen && Boolean(toggleDisplay);
    const id = canBeOpen ? "transition-popper" : undefined;

    return (
        <nav>
            <Button
                id='basic-button'
                aria-describedby={id}
                type='button'
                onClick={handleClick}>
                <Greeting data={props.data} />
                <Avatar id='user-avatar-navbar' src={imgSourcePath} />
            </Button>
            <Popper id={id} open={isOpen} anchorEl={toggleDisplay} transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={250}>
                        <Box
                            sx={{
                                width: 280,
                                height: 300,
                                border: 0,
                                borderRadius: 2,
                                boxShadow: 4,
                                p: 0,
                                bgcolor: "background.paper",
                            }}></Box>
                    </Fade>
                )}
            </Popper>
        </nav>
    );
};

export default User;
