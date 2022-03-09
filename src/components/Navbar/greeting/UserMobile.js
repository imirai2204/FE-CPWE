import React, { useContext } from "react";
import SideBarContext from "../../../store/side-bar-context";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

const UserMobile = () => {
    const categoryMobileCtx = useContext(SideBarContext);

    const accountClassName = categoryMobileCtx.isAccountShown
        ? "user-card-mobile active"
        : "user-card-mobile";

    return (
        <div className={accountClassName}>
            <button className='return' onClick={categoryMobileCtx.onCloseAccount}>
                <ArrowCircleLeftIcon />
            </button>
        </div>
    );
};

export default UserMobile;
