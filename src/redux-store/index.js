/** Store setup using configureStore method from redux-toolkit */
import { configureStore } from "@reduxjs/toolkit";

/** Where to import slice reducers */
import authSlice from "./auth/auth.slice";
import userSlice from "./user/user.slice";
import sideBarSlice from "./sidebar/sidebar.slice";

const store = configureStore({
    reducer: {
        sidebar: sideBarSlice.reducer,
        user: userSlice.reducer,
        auth: authSlice.reducer,
    },
});

export default store;
