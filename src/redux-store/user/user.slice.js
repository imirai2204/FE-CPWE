import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isCardOpen: false,
    userInfo: {
        fullName: "Redux User",
        userId: "REDUX",
        email: "Redux@email.com",
        department: "Testing Redux",
        userRole: "User Test",
        avatar: "/default-avatar.png",
    },
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        updateUserInfo(state, action) {
            state.userInfo = action.payload.userInfo;
        },
        toggleUserCard(state, action) {
            state.isCardOpen = action.payload;
        },
    },
});

export const userActions = userSlice.actions;

export default userSlice;
