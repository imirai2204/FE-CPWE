import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../../../redux-store/user/user.slice";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import SideBarContext from "../../../store/side-bar-context";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import UserCard from "./UserCard";
import AuthContext from "../../../store/auth-context";

const UserMobile = (props) => {
    const dispatch = useDispatch();
    const categoryMobileCtx = useContext(SideBarContext);
    const authCtx = useContext(AuthContext);

    const accountClassName = categoryMobileCtx.isAccountShown
        ? "user-card-mobile active"
        : "user-card-mobile";

    const logOutHandler = () => {
        /** Logic to set user logout */
        // userCardCtx.closeUserCard();
        dispatch(userActions.toggleUserCard(false));
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
            <button className='return' onClick={categoryMobileCtx.onCloseAccount}>
                <ArrowCircleLeftIcon />
            </button>
        </div>
    );
};

export default UserMobile;
