import { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../redux-store/auth/auth.slice";
import { userActions } from "../../../redux-store/user/user.slice";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Greeting from "./Greeting";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import UserCard from "./UserCard";
import LogoutIcon from "@mui/icons-material/Logout";

const User = (props) => {
    const dispatch = useDispatch();
    const isCardShow = useSelector((state) => state.user.isCardOpen);
    const [toggleDisplay, setToggleDisplay] = useState(null);

    const onClickHandler = (event) => {
        setToggleDisplay(event.currentTarget);

        if (isCardShow === true) {
            dispatch(userActions.toggleUserCard(false));
        } else {
            dispatch(userActions.toggleUserCard(true));
        }
    };

    const closeCardHandler = () => {
        dispatch(userActions.toggleUserCard(false));
    };

    const logOutHandler = () => {
        dispatch(userActions.toggleUserCard(false));
        dispatch(authActions.logout());
    };

    const canBeOpen = isCardShow && Boolean(toggleDisplay);
    const id = canBeOpen ? "transition-popper" : undefined;

    return (
        <Fragment>
            <Button id='basic-button' type='button' onClick={onClickHandler}>
                <Greeting userName={props.userName} />
                <Avatar id='user-avatar-navbar' src={props.src} />
            </Button>
            <Popper id={id} open={isCardShow} anchorEl={toggleDisplay} transition>
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
                                <Avatar src={props.src} />
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
