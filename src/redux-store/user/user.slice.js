import { createSlice } from "@reduxjs/toolkit";
import { saveState, getState } from "../localStorage";

const currentUserInfo = getState("userData");

const initialState = {
    isCardOpen: false,
    userInfo:
        currentUserInfo !== undefined
            ? currentUserInfo
            : {
                  fullName: "",
                  email: "",
                  departmentName: "",
                  departmentId: "",
                  userRole: "",
                  avatar: "",
              },
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        updateUserInfo(state, action) {
            state.userInfo.fullName =
                action.payload.userInfo.firstname +
                " " +
                action.payload.userInfo.lastname;
            state.userInfo.email = action.payload.userInfo.email;
            state.userInfo.departmentName = action.payload.userInfo.departmentName;
            state.userInfo.departmentId = action.payload.userInfo.departmentId;
            state.userInfo.userRole = action.payload.userInfo.role;
            state.userInfo.avatar = action.payload.userInfo.avatar;
            saveState("userData", state.userInfo);
        },
        toggleUserCard(state, action) {
            state.isCardOpen = action.payload;
        },
    },
});

export const userActions = userSlice.actions;

export default userSlice;
