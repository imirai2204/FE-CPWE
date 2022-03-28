import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    page: 1,
    rowsPerPage: 5,
    searchText: null,
};

const pageSlice = createSlice({
    name: "page",
    initialState: initialState,
    reducers: {
        updateTableAttribute(state, action) {
            state.page = action.payload.page;
            state.rowsPerPage = action.payload.rowsPerPage;
            state.searchText = action.payload.searchText;
        },
    },
});

export const pageActions = pageSlice.actions;

export default pageSlice;
