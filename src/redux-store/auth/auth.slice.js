import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    isLoggedIn: localStorage.getItem("login") === "true" ? true : null,
    hasError: false,
    errorMessage: "",
    errorCode: 1,
};

const authSlice = createSlice({
    name: "authentication",
    initialState: initialState,
    reducers: {
        successLogin(state, action) {
            state.token = action.payload.token;
            state.isLoggedIn = action.payload.isSuccess;
            state.userInfo = action.payload.userInfo;
            localStorage.setItem("token", state.token);
            localStorage.setItem("login", true);
        },
        failLogin(state, action) {
            state.isLoggedIn = false;
            state.hasError = true;
            state.errorMessage = action.payload.errorMessage;
            state.errorCode = action.payload.errorCode;
        },
        logout(state) {
            localStorage.clear();
            state.isLoggedIn = false;
            return initialState;
        },
    },
});

export const authActions = authSlice.actions;

export default authSlice;
