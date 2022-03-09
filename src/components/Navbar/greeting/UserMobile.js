import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import SideBarContext from "../../../store/side-bar-context";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import UserCard from "./UserCard";
import UserCardContext from "../../../store/user-card-context";
import AuthContext from "../../../store/auth-context";

const UserMobile = (props) => {
    const categoryMobileCtx = useContext(SideBarContext);
    const userCardCtx = useContext(UserCardContext);
    const authCtx = useContext(AuthContext);

    const accountClassName = categoryMobileCtx.isAccountShown
        ? "user-card-mobile active"
        : "user-card-mobile";

    const logOutHandler = () => {
        /** Logic to set user logout */
        userCardCtx.closeUserCard();
        authCtx.onLogout();
        props.onClick();
    };

    return (
        <div className={accountClassName}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    paddingTop: 2.5,
                    "& > :not(style)": {
                        width: 330,
                        height: 420,
                    },
                }}>
                <Paper>
                    <div className='card-image'>
                        <Avatar src={props.src} />
                    </div>
                    <UserCard />
                    <div className='card--info--button'>
                        <div className='user-settings-btn'>
                            <Link to='/user/user-settings'>
                                <button onClick={props.onClick}>User Settings</button>
                            </Link>
                        </div>
                        <div className='log-out-btn'>
                            <Link className='log-out' to='/login'>
                                <button onClick={logOutHandler}>
                                    Logout <LogoutIcon />
                                </button>
                            </Link>
                        </div>
                    </div>
                </Paper>
            </Box>
            <button className='return' onClick={categoryMobileCtx.onCloseAccount}>
                <ArrowCircleLeftIcon />
            </button>
        </div>
    );
};

export default UserMobile;

/**                    <div className='card--info--button'>
                        <div className='user-settings-btn'>
                            <Button onClick={props.onClick} size='small'>
                                <Link to='/user/user-settings'>User Settings</Link>
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
                    </div> */
