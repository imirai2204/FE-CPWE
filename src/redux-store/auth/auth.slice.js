import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    hasError: false,
};

const authSlice = createSlice({
    name: "authentication",
    initialState: initialState,
    reducers: {},
});

export const authActions = authSlice.actions;

export default authSlice;
