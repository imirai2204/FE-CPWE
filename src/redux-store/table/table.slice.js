import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    page: 1,
    rowsPerPage: 5
};

const pageSlice = createSlice({
    name: "page",
    initialState: initialState,
    reducers: {
        updateCurrentPage(state, action) {
            state.page = action.payload.page;
            state.rowsPerPage = action.payload.rowsPerPage;
        },
    },
});

export const pageActions = pageSlice.actions;

export default pageSlice;