import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isCategoryShown: false,
    isAccountShown: false,
};

const sideBarSlice = createSlice({
    name: "side-bar",
    initialState: initialState,
    reducers: {
        showCategory(state) {
            state.isCategoryShown = true;
        },
        hideCategory(state) {
            state.isCategoryShown = false;
        },
        showAccount(state) {
            state.isAccountShown = true;
        },
        hideAccount(state) {
            state.isAccountShown = false;
        },
    },
});

export const sideBarActions = sideBarSlice.actions;

export default sideBarSlice;
