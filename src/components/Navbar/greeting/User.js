import { useState, Fragment, useContext } from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Greeting from "./Greeting";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import UserCard from "./UserCard";
import LogoutIcon from "@mui/icons-material/Logout";
import UserCardContext from "../../../store/user-card-context";
import AuthContext from "../../../store/auth-context";

const defaultAvatar = "/default-avatar.png";

const User = (props) => {
    const [toggleDisplay, setToggleDisplay] = useState(null);
    const [isLogOut, setIsLogOut] = useState(false);
    const userCardCtx = useContext(UserCardContext);
    const authCtx = useContext(AuthContext);

    const onClickHandler = (event) => {
        setToggleDisplay(event.currentTarget);

        if (userCardCtx.isCardOpen === true) {
            userCardCtx.closeUserCard();
        } else {
            userCardCtx.showUserCard();
        }
    };

    const closeCardHandler = () => {
        userCardCtx.closeUserCard();
    };

    const logOutHandler = () => {
        /** Logic to set user logout */
        userCardCtx.closeUserCard();
        authCtx.onLogout();
        setIsLogOut(true);
        setTimeout(() => {
            console.log(isLogOut);
        }, 500);
    };

    const imgSourcePath = props.src !== undefined ? props.src : defaultAvatar;
    const canBeOpen = userCardCtx.isCardOpen && Boolean(toggleDisplay);
    const id = canBeOpen ? "transition-popper" : undefined;

    return (
        <Fragment>
            <Button id='basic-button' type='button' onClick={onClickHandler}>
                <Greeting data={props.data} />
                <Avatar id='user-avatar-navbar' src={imgSourcePath} />
            </Button>
            <Popper
                id={id}
                open={userCardCtx.isCardOpen}
                anchorEl={toggleDisplay}
                transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={250}>
                        <Box
                            sx={{
                                width: 280,
                                height: 310,
                                border: 0,
                                borderRadius: 2,
                                boxShadow: 4,
                                p: 0,
                                bgcolor: "background.paper",
                            }}>
                            <div className='card-image'>
                                <Avatar src={imgSourcePath} />
                            </div>
                            <UserCard />
                            <div className='card--info--button'>
                                <div className='user-settings-btn'>
                                    <Button onClick={closeCardHandler} size='small'>
                                        <Link to='/user/user-settings'>
                                            User Settings
                                        </Link>
                                    </Button>
                                </div>
                                <div className='log-out-btn'>
                                    <Button
                                        size='small'
                                        color='error'
                                        endIcon={<LogoutIcon />}
                                        onClick={logOutHandler}>
                                        <Link className='log-out' to='/login'>
                                            Logout
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </Box>
                    </Fade>
                )}
            </Popper>
        </Fragment>
    );
};

export default User;
