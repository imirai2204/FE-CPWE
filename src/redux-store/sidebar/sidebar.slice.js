import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isCategoryShown: false,
    isAccountShown: false,
};

const sideBarSlice = createSlice({
    name: "side-bar",
    initialState: initialState,
    reducers: {
        toggleCategory(state, action) {
            state.isCategoryShown = action.payload;
        },
        toggleUserCardMobile(state, action) {
            state.isAccountShown = action.payload;
        },
    },
});

export const sideBarActions = sideBarSlice.actions;

export default sideBarSlice;
