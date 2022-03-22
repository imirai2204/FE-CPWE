import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../redux-store/auth/auth.slice";
import { userActions } from "../../../redux-store/user/user.slice";
import { sideBarActions } from "../../../redux-store/sidebar/sidebar.slice";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import UserCard from "./UserCard";

const UserMobile = (props) => {
    const dispatch = useDispatch();
    const isUserCardShown = useSelector((state) => state.sideBar.isAccountShown);

    const accountClassName = isUserCardShown
        ? "user-card-mobile active"
        : "user-card-mobile";

    const logOutHandler = () => {
        dispatch(userActions.toggleUserCard(false));
        dispatch(authActions.logout());
        props.onClick();
    };

    const clickArrowIconHandler = () => {
        dispatch(sideBarActions.toggleUserCardMobile(false));
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
                            <Link to='/user/user-settings' onClick={props.onClick}>
                                User Settings
                            </Link>
                        </div>
                        <div className='log-out-btn'>
                            <Link
                                className='log-out'
                                to='/login'
                                onClick={logOutHandler}>
                                Logout <LogoutIcon />
                            </Link>
                        </div>
                    </div>
                </Paper>
            </Box>
            <button className='return' onClick={clickArrowIconHandler}>
                <ArrowCircleLeftIcon />
            </button>
        </div>
    );
};

export default UserMobile;
