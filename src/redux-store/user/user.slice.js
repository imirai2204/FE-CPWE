import { createSlice } from "@reduxjs/toolkit";
import { saveState, getState } from "../localStorage";
import { storage } from "../../firebase/firebase";
import { ref } from "firebase/storage";

const currentUserInfo = getState("userData");

const imageRef = ref(storage, "user-avatar/");

export const isEmpty = (value) => {
    return (
        // null or undefined
        value == null ||
        // has length and it's zero
        (value.hasOwnProperty("length") && value.length === 0) ||
        // is an Object and has no keys
        (value.constructor === Object && Object.keys(value).length === 0)
    );
};

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
                  userId: "",
              },
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        updateUserInfo(state, action) {
            state.userInfo.fullName =
                action.payload.userInfo.firstname + " " + action.payload.userInfo.lastname;
            state.userInfo.email = action.payload.userInfo.email;
            state.userInfo.departmentName = action.payload.userInfo.departmentName;
            state.userInfo.departmentId = action.payload.userInfo.departmentId;
            state.userInfo.userRole = action.payload.userInfo.role;
            state.userInfo.userId = action.payload.userInfo.userId;
            if (isEmpty(action.payload.userInfo.avatar)) {
                state.userInfo.avatar = "/default-avatar.png";
            } else {
                state.userInfo.avatar = action.payload.userInfo.avatar;
            }
            saveState("userData", state.userInfo);
        },
        toggleUserCard(state, action) {
            state.isCardOpen = action.payload;
        },
    },
});

export const userActions = userSlice.actions;

export default userSlice;
